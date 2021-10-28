import gql from "graphql-tag";

// Mutation to register a new user to the website
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation to log a user in
export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

// Mutation to add a book to a user's saved books
export const SAVE_BOOK = gql`
mutation saveBook($input: savedBook!) {
    saveBook(input: $input) {
      _id
      username
      email
      bookCount
      savedBooks {
        # _id
        bookId
        authors
        link
        description
        bookId
        image
        title
      }
    }
  }
`;

// Mutation to remove a book from a user's saved books
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        # _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;