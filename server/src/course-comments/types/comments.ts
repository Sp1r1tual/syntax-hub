import { z } from "zod";

import { CommentsImageSchema } from "../schemas/course-comments-image.schema";

export interface ICreateComment {
  userId: string;
  questionId: string;
  text: string;
  images: z.infer<typeof CommentsImageSchema>[];
}

export interface IReplyToComment {
  userId: string;
  parentCommentId: string;
  text: string;
  images: z.infer<typeof CommentsImageSchema>[];
}

export interface IEditComment {
  commentId: string;
  userId: string;
  text?: string;
  images?: z.infer<typeof CommentsImageSchema>[];
}

export interface TransformedComment {
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
  replies: TransformedComment[];
}
