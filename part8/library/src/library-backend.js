const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!  
  }
  type Query {
    bookCount: Int!
    authorCount: Int! 
    allBooks(author:String, genre:String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    addAuthor(
      name: String!
      id: ID
      born: Int
      bookCount: Int
    ): Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = (await Author.findOne({ name: args.author })) || false;

      if (args.author && !args.genre) {
        return Book.find({ author: author._id }).populate("author");
      } else if (!args.author && args.genre) {
        const result = await Book.find({ genres: args.genre }).populate(
          "author"
        );

        return result;
      } else if (args.author && args.genre) {
        return Book.find({ author: author._id, genres: args.genre }).populate(
          "author"
        );
      } else if (!args.author && !args.genre) {
        return Book.find({}).populate("author");
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const result = authors.map(async (a) => {
        const count = await Book.countDocuments({ author: a._id });
        return {
          ...a._doc,
          id: a._doc._id,
          bookCount: count,
        };
      });
      return result;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      } else if (args.title.length < 5) {
        throw new GraphQLError("title must contain at least 5 characters", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: "args.title",
          },
        });
      } else if (!args.title) {
        throw new GraphQLError("missing book's title ", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: "args.title",
          },
        });
      }

      const isAuthor = await Author.findOne({ name: args.author });
      if (!isAuthor) {
        const author = new Author({ name: args.author });
        await author.save();
        const book = new Book({ ...args, author: author._id });
        await book.save().catch((err) => console.log("err:", err));
        return Book.findOne({ title: book.title }).populate("author");
      }
      const book = new Book({ ...args, author: isAuthor._id });
      await book.save().catch((error) => {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: "args.title",
            error,
          },
        });
      });
      return Book.findOne({ title: book.title }).populate("author");
    },
    addAuthor: async (root, args) => {
      if (args.name.length < 4) {
        throw new GraphQLError("name must contain at least 4 characters", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: "args.title",
          },
        });
      } else if (!args.name) {
        throw new GraphQLError("missing author's name ", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: "args.title",
          },
        });
      }

      const author = new Author({ ...args });
      return author.save();
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const foundAuthor = await Author.findOne({ name: args.name });
      if (!foundAuthor) {
        throw new GraphQLError("author's name not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: "args.name",
          },
        });
      }
      const updateAuthor = {
        ...foundAuthor._doc,
        id: foundAuthor._id,
        born: args.setBornTo,
      };
      return Author.findByIdAndUpdate(updateAuthor._id, updateAuthor, {
        new: true,
      });
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      console.log("user", user);
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
        favoriteGenre: user.favoriteGenre,
      };
      console.log("userfortoken", userForToken);
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
    return;
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
