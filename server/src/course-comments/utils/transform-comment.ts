import { Comment, CommentImage, CommentLike, User } from "@prisma/client";

export interface ITransformedComment {
  id: string;
  userId: string;
  username: string;
  avatar: string | null;
  text: string;
  createdAt: string;
  editedAt?: string;
  deletedAt?: string;
  likes: number;
  liked: boolean;
  images: Array<{
    id: string;
    order: number;
    src: string;
  }>;
  replies: ITransformedComment[];
}

type CommentWithRelationsBaseType = Comment & {
  user: Pick<User, "id" | "name" | "avatar">;
  images: CommentImage[];
  likes: CommentLike[];
  _count: {
    likes: number;
  };
};

export type CommentWithRelationsType = CommentWithRelationsBaseType & {
  replies?: CommentWithRelationsType[];
};

export const transformComment = (
  comment: unknown,
  userId?: string,
): ITransformedComment => {
  const c = comment as CommentWithRelationsType;

  return {
    id: c.id,
    userId: c.userId,
    username: c.user?.name || "Anonymous",
    avatar: c.user?.avatar || null,
    text: c.text,
    createdAt: c.createdAt.toISOString(),
    editedAt:
      c.updatedAt.getTime() !== c.createdAt.getTime()
        ? c.updatedAt.toISOString()
        : undefined,
    deletedAt: c.deletedAt?.toISOString(),
    likes: c._count?.likes || 0,
    liked: userId ? (c.likes?.length || 0) > 0 : false,
    images: c.images.map((img) => ({
      id: img.id,
      order: img.order,
      src: img.src,
    })),
    replies: (c.replies || []).map((reply) => transformComment(reply, userId)),
  };
};

export const flattenDeepReplies = (
  comment: ITransformedComment,
  currentLevel: number = 1,
): ITransformedComment => {
  if (currentLevel === 3) {
    const flatReplies: ITransformedComment[] = [];

    const collectReplies = (replies: ITransformedComment[]): void => {
      replies.forEach((reply) => {
        flatReplies.push({
          ...reply,
          replies: [],
        });

        if (reply.replies && reply.replies.length > 0) {
          collectReplies(reply.replies);
        }
      });
    };

    if (comment.replies && comment.replies.length > 0) {
      collectReplies(comment.replies);
    }

    return {
      ...comment,
      replies: flatReplies,
    };
  }

  return {
    ...comment,
    replies: comment.replies.map((reply) =>
      flattenDeepReplies(reply, currentLevel + 1),
    ),
  };
};
