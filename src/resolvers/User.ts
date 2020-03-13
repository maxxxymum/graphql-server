import { User, Prisma } from '../generated/prisma-client';

export function links(parent: User, _: any, context: {prisma: Prisma}) {
    return context.prisma.user({ id: parent.id }).links();
}