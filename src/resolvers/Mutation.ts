import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getUserId, APP_SECRET } from "../utils";
import { Prisma, User, Link } from "../generated/prisma-client";

export interface AuthPayload {
  token: string;
  user: User;
}

export async function signup(
  _: any,
  args: {
    email: string;
    password: string;
    name: string;
  },
  context: {
    prisma: Prisma;
  }
): Promise<AuthPayload> {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

export async function login(
  _: any,
  args: {
    email: string;
    password: string;
  },
  context: {
    prisma: Prisma;
  }
): Promise<AuthPayload> {
  const user = await context.prisma.user({ email: args.email });

  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

export function createLink(
  _: any,
  args: {
    url: string;
    description: string;
  },
  context: {
    prisma: Prisma;
  }
): Promise<Link> {
  const userId = getUserId(context);

  if (!userId) {
    throw new Error("On logge in users allowed to create links");
  }

  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  });
}

export async function vote(
  _: any,
  args: {
    linkId: string;
  },
  context: {
    prisma: Prisma;
  }
) {
  const userId = getUserId(context);
  const voteExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId },
  });

  if (voteExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } },
  });
}
