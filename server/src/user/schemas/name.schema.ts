import z from "zod";

export const NameSchema = z.object({
  name: z
    .string({ message: "Name must be a string" })
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(32, "Name must not exceed 32 characters")
    .optional(),
});
