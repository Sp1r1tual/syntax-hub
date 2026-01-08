import { TransformedComment } from "../types";

import { Comment, CommentImage, CommentLike, User } from "@prisma/client";

export type CommentWithRelationsType = Comment & {
  user: Pick<User, "id" | "name" | "avatar">;
  images: CommentImage[];
  likes: CommentLike[];
  _count: {
    likes: number;
  };
  replies?: CommentWithRelationsType[];
};

export const transformComment = (
  comment: any,
  userId?: string,
): TransformedComment => {
  return {
    id: comment.id,
    userId: comment.userId,
    username: comment.user?.name || "Anonymous",
    avatar: comment.user?.avatar || null,
    text: comment.text,
    createdAt: comment.createdAt.toISOString(),
    editedAt:
      comment.updatedAt.getTime() !== comment.createdAt.getTime()
        ? comment.updatedAt.toISOString()
        : undefined,
    deletedAt: comment.deletedAt?.toISOString(),
    likes: comment._count?.likes || 0,
    liked: userId ? (comment.likes?.length || 0) > 0 : false,
    images: (comment.images || []).map((img: CommentImage) => ({
      id: img.id,
      order: img.order,
      src: img.src,
    })),
    replies: (comment.replies || []).map((reply: any) =>
      transformComment(reply, userId),
    ),
  };
};

export const flattenDeepReplies = (
  comment: TransformedComment,
  currentLevel: number = 1,
): TransformedComment => {
  if (currentLevel === 3) {
    const flatReplies: TransformedComment[] = [];

    const collectReplies = (replies: TransformedComment[]) => {
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
