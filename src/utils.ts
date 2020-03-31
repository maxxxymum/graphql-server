import jwt from "jsonwebtoken";
import { Prisma } from "./generated/prisma-client";

export const APP_SECRET = "GraphQL-is-aw3some";

export function getUserId(context: any) {
  const Authorization = context.request.get("Authorization");

  if (Authorization) {
    const token: string = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET) as any;

    return userId;
  }

  throw new Error("Not authenticated");
}

export interface GraphQLContext {
  prisma: Prisma;
}
