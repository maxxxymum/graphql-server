import { GraphQLContext } from '../utils';

export async function feed(_: any, args: {filter: string}, context: GraphQLContext,) {
    const where = args.filter ? {
      OR: [
        { description_contains: args.filter },
        { url_contains: args.filter },
      ],
    } : {}
  
    const links = await context.prisma.links({where});
    
    return links;
}