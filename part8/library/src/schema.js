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
  type Subscription {
    bookAdded: Book!
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

module.exports = typeDefs;
