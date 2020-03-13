import { GraphQLServer } from 'graphql-yoga';
import { Link } from './models';

let links: Link[] = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const Query = {
    info: () => 'Hello GraphQL world!',
    feed: () => links,
    link: (_: any, args: {id: string}) => links.find((link) => link.id === args.id)
}

const Mutation = {
    createLink: (_: any, args: {
        url: string,
        description: string
    }) => {
       const link: Link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);

      return link;
    },

    updateLink: (_: any, args: {
        id: string,
        description?: string,
        url?: string,
    }) => {
        const link = links.find(link => link.id === args.id);

        if (link) {
            link.description = args.description ? args.description : link.description;
            link.url = args.url ? args.url : link.url;

            return link;
        } else {
            throw new Error('No mathcing link');
        }
    },

    deleteLink: (_: any, args: {
        id: string
    }) => {
        const linkToDelete = links.find(link => link.id === args.id);

        if (linkToDelete) {
            links.filter(link => link.id === linkToDelete.id);

            return linkToDelete;
        } else {
            throw new Error('Nothing was deleted');
        }
    }
}

const resolvers = {
    Query,
    Mutation
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`))