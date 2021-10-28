// Import dependencies and database config
const express = require('express');
const path = require('path');
const db = require('./config/connection');

// Import Apollo Server
const { ApolloServer } = require('apollo-server-express');

// Import middleware for authorization
const { authMiddleware } = require('./utils/auth');

// Import GraphQL typeDefs and Resolvers
const { typeDefs, resolvers } = require('./schemas');

// Set up express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Apollo Server using auth middleware as context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// Boilerplate
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Hook up Apollo Server to use Express
server.applyMiddleware({ app });

// Once database connection has been established, start the server
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
