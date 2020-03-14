import { Vote, Prisma } from '../generated/prisma-client';

export function link(parent: Vote, _: any, context: {prisma: Prisma}) {
    return context.prisma.vote({ id: parent.id }).link()
}
  
export function user(parent: Vote, _: any, context: {prisma: Prisma}) {
    return context.prisma.vote({ id: parent.id }).user()
}