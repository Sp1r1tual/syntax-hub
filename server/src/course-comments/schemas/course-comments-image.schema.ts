import { z } from "zod";

export const CommentsImageSchema = z.object({
  id: z.string(),
  order: z.number(),
  src: z.string(),
});
