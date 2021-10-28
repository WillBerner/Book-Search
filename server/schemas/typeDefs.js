// Import GraphQL from Apollo
const { gql } = require('apollo-server-express');

const typeDefs = gql`

    # Declaring Query types
    type Query {
        me: User
    }

    # Declaring Mutation types
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: savedBook!): User
        removeBook(bookId: ID!): User
    }

    # Declaring other types
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    # Declaring input type for books
    input savedBook {
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

`

module.exports = typeDefs;