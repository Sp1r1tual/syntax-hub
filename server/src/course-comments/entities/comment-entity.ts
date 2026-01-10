import { Prisma } from "@prisma/client";

export const commentIncludeBasic = (userId?: string) => ({
  user: {
    select: {
      id: true,
      name: true,
      avatar: true,
    },
  },
  images: {
    orderBy: {
      order: "asc" as const,
    },
  },
  likes: userId
    ? {
        where: {
          userId,
        },
        select: {
          userId: true,
        },
      }
    : false,
  _count: {
    select: {
      likes: true,
    },
  },
});

export const commentIncludeWithReplies = (userId?: string) => ({
  ...commentIncludeBasic(userId),
  replies: {
    where: {
      deletedAt: null,
    },
    include: commentIncludeBasic(userId),
    orderBy: {
      createdAt: "asc" as const,
    },
  },
});

const createNestedRepliesInclude = (
  userId?: string,
  depth: number = 3,
): Prisma.CommentInclude => {
  if (depth === 0) {
    return commentIncludeBasic(userId);
  }

  return {
    ...commentIncludeBasic(userId),
    replies: {
      where: {
        deletedAt: null,
      },
      include: createNestedRepliesInclude(userId, depth - 1),
      orderBy: {
        createdAt: "asc" as const,
      },
    },
  };
};

export const commentIncludeWithNestedReplies = (userId?: string) =>
  createNestedRepliesInclude(userId, 4);
