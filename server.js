const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

function createTestServer(context = {}) {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: () => context,
  });
}

module.exports = { createTestServer };
