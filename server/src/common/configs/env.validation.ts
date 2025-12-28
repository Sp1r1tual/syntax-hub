import { z, ZodError } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("5000"),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),

  DATABASE_URL: z.string().url(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string().url(),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRATION: z.string().default("3600"),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  try {
    return envSchema.parse(config);
  } catch (error) {
    if (error instanceof ZodError) {
      const missingVars = error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      );
      throw new Error(
        `Environment validation failed:\n${missingVars.join("\n")}`,
      );
    }
    throw error;
  }
}
