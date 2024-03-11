const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const author = require("./models/author");

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
      console.log("AUTHOR.FIND");
      const authors = await Author.find({});
      const result = authors.map((a) => {
        return {
          id: a._id,
          name: a.name,
          born: a.born,
          bookCount: a.books.length,
        };
      });

      return result;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => root.books.length,
  },
  Book: {
    author: async (root) => await Author.findById(root.author),
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

      try {
        if (!isAuthor) {
          const author = new Author({ name: args.author });
          const book = new Book({ ...args, author: author._id });
          author.books = author.books.concat(book._id);
          await author.save();
          await book.save();

          const returnBook = await Book.findOne({ title: book.title }).populate(
            "author"
          );
          pubsub.publish("BOOK_ADDED", { bookAdded: returnBook });
          return returnBook;
        } else {
          const book = new Book({ ...args, author: isAuthor._id });
          isAuthor.books = isAuthor.books.concat(book._id);
          await isAuthor.save();
          await book.save();

          const returnBook = await Book.findOne({ title: book.title }).populate(
            "author"
          );

          pubsub.publish("BOOK_ADDED", { bookAdded: returnBook });
          return returnBook;
        }
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

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
