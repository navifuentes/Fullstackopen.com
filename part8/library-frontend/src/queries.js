import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
export const ME = gql`
  query {
    me {
      favoriteGenre
      username
      id
    }
  }
`;
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      id
      genres
    }
  }
`;
export const FILTER_BOOKS = gql`
  query filterBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      id
      genres
      author {
        name
      }
    }
  }
`;
export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;
export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    id
    published
    genres
    author {
      name
    }
  }
`;
export const EDIT_YEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`;
