// Import typeDefs and resolvers
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Export for use with Apollo Server in server.js
module.exports = { typeDefs, resolvers };