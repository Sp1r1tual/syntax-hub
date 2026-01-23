import z from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("5000"),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),

  DATABASE_URL: z.string().url(),

  UPSTASH_REDIS_REST_URL: z.string().url({
    message: "UPSTASH_REDIS_REST_URL must be a valid URL",
  }),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1, {
    message: "UPSTASH_REDIS_REST_TOKEN is required",
  }),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string().url(),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRATION: z.string().default("3600"),

  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});
