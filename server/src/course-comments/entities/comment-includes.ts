import { Prisma } from "@prisma/client";

const baseCommentInclude = (userId?: string) => ({
  user: {
    select: {
      id: true,
      name: true,
      avatar: true,
    },
  },
  images: {
    orderBy: { order: "asc" as const },
  },
  likes: userId ? { where: { userId } } : false,
  _count: {
    select: { likes: true },
  },
});

export const commentIncludeWithReplies = (
  userId?: string,
): Prisma.CommentInclude => ({
  ...baseCommentInclude(userId),
  replies: {
    where: { deletedAt: null },
    include: baseCommentInclude(userId),
    orderBy: { createdAt: "asc" as const },
  },
});

export const commentIncludeWithNestedReplies = (
  userId?: string,
): Prisma.CommentInclude => ({
  ...baseCommentInclude(userId),
  replies: {
    where: { deletedAt: null },
    include: {
      ...baseCommentInclude(userId),
      replies: {
        where: { deletedAt: null },
        include: baseCommentInclude(userId),
        orderBy: { createdAt: "asc" as const },
      },
    },
    orderBy: { createdAt: "asc" as const },
  },
});

export const commentIncludeBasic = (userId?: string): Prisma.CommentInclude =>
  baseCommentInclude(userId);
