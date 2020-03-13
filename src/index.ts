import { GraphQLServer } from 'graphql-yoga';
import { Link } from './models';
import { prisma } from './generated/prisma-client';

const Query = {
    info: () => 'Hello GraphQL world!',
    feed: (_: any, __: any, context: any) => {
        return context.prisma.links()
    },
}

const Mutation = {
    createLink: (_: any, args: {
        url: string,
        description: string,
    }, context: any) => {
        return context.prisma.createLink({
            url: args.url,
            description: args.description,
        })
      },
}

const resolvers = {
    Query,
    Mutation
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma },
});

server.start(() => console.log(`Server is running on http://localhost:4000`))