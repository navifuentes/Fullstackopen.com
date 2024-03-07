const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");

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
    console.log("error connection to MongoDB:", error);
  });

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int! 
    allBooks(author:String, genre:String): [Book!]!
    allAuthors: [Author!]!
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
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = (await Author.findOne({ name: args.author })) || false;

      if (args.author && !args.genre) {
        return Book.find({ author: author._id });
        //books.filter((book) => book.author === args.author);
      } else if (!args.author && args.genre) {
        return Book.find({ genres: args.genre });
        // books.filter((b) => b.genres.find((g) => g === args.genre));
      } else if (args.author && args.genre) {
        //const filtered = books.filter((b) => b.author === args.author);
        return Book.find({ author: author._id, genres: args.genre });
        // filtered.filter((b) => b.genres.find((g) => g === args.genre));
      } else if (!args.author && !args.genre) {
        return Book.find({});
      }
    },
    allAuthors: async () => {
      const books = await Book.find({});
      const authors = await Author.find({});
      const result = authors.map((a) => {
        return {
          ...a._doc,
          id: a._doc._id,
          bookCount: books.map((b) => b.author === a._id).length,
        };
      });
      return result;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      if (args.title.length < 5) {
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
      } /* else if (!args.author || !args.published || !genres) {
        throw new GraphQLError("missing book's data ", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: "args.title",
          },
        });
      }  */

      try {
        const isAuthor = await Author.findOne({ name: args.author });
        console.log("isAuthor:", isAuthor);
        if (!isAuthor) {
          const author = new Author({ name: args.author });
          await author.save();
          const book = new Book({ ...args, author: author });
          return book.save();
        }
        const book = new Book({ ...args, author: isAuthor });
        return book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: "args.title",
            error,
          },
        });
      }
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
    editAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name });
      if (!foundAuthor) {
        throw new GraphQLError("author's name not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: "args.name",
          },
        });
      }
      console.log("foundAuthor", foundAuthor);
      const updateAuthor = {
        ...foundAuthor._doc,
        id: foundAuthor._id,
        born: args.setBornTo,
      };
      console.log("update", updateAuthor);

      return updateAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
