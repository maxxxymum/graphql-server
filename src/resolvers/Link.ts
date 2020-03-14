import { Prisma, Link } from '../generated/prisma-client';

export function postedBy(parent: Link, _: any, context: {prisma: Prisma}) {  
    return context.prisma.link({ id: parent.id }).postedBy();
}

export function votes(parent: Link, _: any, context: {prisma: Prisma}) {
    return context.prisma.link({ id: parent.id }).votes();
}