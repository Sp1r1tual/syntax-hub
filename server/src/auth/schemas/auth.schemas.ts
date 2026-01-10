import { z } from "zod";

import { UserRole } from "@prisma/client";

export const UserRoleSchema = z.nativeEnum(UserRole);

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export const GoogleProfileSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  name: z.object({
    familyName: z.string(),
    givenName: z.string(),
  }),
  emails: z.array(
    z.object({
      value: z.string().email(),
      verified: z.boolean(),
    }),
  ),
  photos: z
    .array(
      z.object({
        value: z.string().url(),
      }),
    )
    .optional(),
  provider: z.string(),
  _raw: z.string(),
  _json: z.object({
    sub: z.string(),
    name: z.string(),
    given_name: z.string(),
    family_name: z.string(),
    picture: z.string(),
    email: z.string().email(),
    email_verified: z.boolean(),
    locale: z.string(),
  }),
});

export const RefreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
});

export const GoogleAuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  avatar: z.string().url().nullable(),
  role: UserRoleSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const JwtPayloadSchema = z.object({
  userId: z.string(),
  role: UserRoleSchema,
  iat: z.number().optional(),
  exp: z.number().optional(),
});

export const JwtUserSchema = z.object({
  userId: z.string(),
  role: UserRoleSchema,
});
