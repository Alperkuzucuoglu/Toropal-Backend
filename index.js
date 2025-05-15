const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Her istekte Authorization: Bearer <token> başlığını kontrol eder
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const auth = req.headers.authorization || '';
        const token = auth.replace('Bearer ', '');
        if (!token) {
            throw new Error('Unauthorized');
        }
        return { userToken: token };
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
