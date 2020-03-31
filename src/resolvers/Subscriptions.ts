import { Prisma, Link, Vote } from "../generated/prisma-client";

function newLinkSubscribe(
  _: any,
  __: any,
  context: {
    prisma: Prisma;
  }
) {
  return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
}

export const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload: Link) => payload,
};

function newVoteSubscribe(_: any, __: any, context: { prisma: Prisma }) {
  return context.prisma.$subscribe.vote({ mutation_in: ["CREATED"] }).node();
}

export const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload: Vote) => payload,
};
