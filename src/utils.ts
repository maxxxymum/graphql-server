import jwt from 'jsonwebtoken';

export const APP_SECRET = 'GraphQL-is-aw3some';

export function getUserId(context: any) {
    const Authorization = context.request.get('Authorization');

    if (Authorization) {
        const token: string = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, APP_SECRET) as any;

        return userId;
    }

    throw new Error('Not authenticated')
}
