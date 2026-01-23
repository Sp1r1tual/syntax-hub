import { z } from "zod";
import { UserRole } from "@prisma/client";

const UserRoleEnum = z.enum(Object.values(UserRole) as [string, ...string[]]);

export const SocialsSchema = z.object({
  telegramUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  instagramUrl: z.string().url().optional(),
});

export const CreateUserOAuthSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  avatar: z.string().url().optional(),
});

export const UpdateUserProfileSchema = z.object({
  name: z.string().nullable().optional(),
  avatar: z.string().url().nullable().optional(),
  socials: SocialsSchema.optional(),
});

export const BanUserSchema = z.object({
  reason: z.string().min(1).max(500).optional(),
});

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  avatar: z.string().nullable(),
  socials: SocialsSchema.optional().nullable(),
  role: UserRoleEnum,
  isBanned: z.boolean(),
  bannedAt: z.date().nullable().optional(),
  bannedReason: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PublicUserResponseSchema = UserResponseSchema.omit({
  role: true,
  email: true,
});
