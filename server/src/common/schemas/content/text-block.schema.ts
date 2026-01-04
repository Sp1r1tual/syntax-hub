import { z } from "zod";

export const TextBlockSchema = z.object({
  id: z.string(),
  type: z.literal("TEXT"),
  content: z.string(),
});
