import { GraphQLContext } from '../utils';

export async function feed(_: any, args: {
  filter: string,
  skip: number,
  first: number
}, context: GraphQLContext,) {
    const where = args.filter ? {
      OR: [
        { description_contains: args.filter },
        { url_contains: args.filter },
      ],
    } : {}
  
    const links = await context.prisma.links({
      where,
      skip: args.skip,
      first: args.first
    });
    
    return links;
}