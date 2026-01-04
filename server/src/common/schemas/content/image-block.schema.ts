import { z } from "zod";

export const ImageBlockSchema = z.object({
  id: z.string(),
  type: z.literal("IMAGE"),
  src: z.string().url(),
  alt: z.string().optional(),
  caption: z.string().optional(),
});
