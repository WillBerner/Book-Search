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
        saveBook(input: SavedBookInput): User
        removeBook(bookId: String!): User
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
        authors: [String]
        description: String
        bookId: String
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
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    
`

module.exports = typeDefs;