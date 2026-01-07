import { z } from "zod";

import { CommentsImageSchema } from "./course-comments-image.schema";

export const CommentsResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  username: z.string(),
  avatar: z.string().optional(),
  text: z.string(),
  createdAt: z.string(),
  editedAt: z.string().optional(),
  deletedAt: z.string().optional(),
  likes: z.number(),
  liked: z.boolean(),
  images: z.array(CommentsImageSchema),
  replies: z.array(z.lazy(() => CommentsResponseSchema)),
});
