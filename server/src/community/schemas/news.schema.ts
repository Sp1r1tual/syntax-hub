import { z } from "zod";

export const NewsResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  likes: z.number(),
  liked: z.boolean(),
  createdAt: z.coerce.date(),
});
