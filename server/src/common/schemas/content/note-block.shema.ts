import { z } from "zod";

export const NoteBlockSchema = z.object({
  id: z.string(),
  type: z.literal("NOTE"),
  content: z.string(),
});
