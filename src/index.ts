import { GraphQLServer } from 'graphql-yoga';
import { Link } from './models';

let links: Link[] = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
}
`;

const Query = {
    info: () => 'Hello GraphQL world!',
    feed: () => links
}

const resolvers = {
    Query
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`))