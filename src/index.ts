const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
type Query {
    info: String!
}
`;

interface QueryResolvers {
    info: () => string;
}

const Query: QueryResolvers = {
    info: () => 'Hello GraphQL world!'
}

const resolvers = {
    Query
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`))