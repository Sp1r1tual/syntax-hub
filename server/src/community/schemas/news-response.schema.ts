import { z } from "zod";

import { NewsContentBlockSchema } from "./news-content-block.schema";

export const NewsResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  likes: z.number(),
  liked: z.boolean(),
  content: z.array(NewsContentBlockSchema),
  createdAt: z.coerce.date(),
});
