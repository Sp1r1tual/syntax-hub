import { z } from "zod";

export const CreateUserOAuthSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  avatar: z.string().url().optional(),
});

export const UpdateUserProfileSchema = z.object({
  name: z.string().nullable().optional(),
  avatar: z.string().url().nullable().optional(),
});

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  avatar: z.string().nullable(),
  role: z.enum(["USER", "ADMIN"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UpdateUserProfileDto = z.infer<typeof UpdateUserProfileSchema>;
