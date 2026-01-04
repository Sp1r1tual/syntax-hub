import { z } from "zod";

export const ListBlockSchema = z.object({
  id: z.string(),
  type: z.literal("LIST"),
  items: z.array(z.string()),
  title: z.string().optional(),
  ordered: z.boolean().optional(),
});
