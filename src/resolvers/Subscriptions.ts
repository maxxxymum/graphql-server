import { Prisma } from '../generated/prisma-client';

function newLinkSubscribe(_: any, __: any, context: {
    prisma: Prisma
}) {
    return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
}
  
export const newLink = {
    subscribe: newLinkSubscribe,
    resolve: (payload: any) => payload,
}