import { Prisma } from "@prisma/client";

export const newsIncludeBasic = () => ({});

export const newsIncludeWithLikes = (userId?: string) => ({
  ...newsIncludeBasic(),
  likedBy: userId
    ? {
        where: {
          userId,
        },
      }
    : false,
});

export type NewsWithLikes = Prisma.NewsGetPayload<{
  include: ReturnType<typeof newsIncludeWithLikes>;
}>;
