import { GraphQLContext } from '../utils';
import { LinkOrderByInput } from '../generated/prisma-client';
 
export async function feed(_: any, args: {
  filter: string,
  skip: number,
  first: number,
  orderBy: LinkOrderByInput
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
      first: args.first,
      orderBy: args.orderBy
    });
    
    return links;
}