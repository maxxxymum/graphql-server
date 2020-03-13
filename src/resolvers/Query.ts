export function feed(_: any, __: any, context: any) {
    return context.prisma.links()
};