import { Prisma } from '../generated/prisma-client';

export function feed(_: any, __: any, context: {prisma: Prisma}) {
    return context.prisma.links();
};