import { z, ZodError } from "zod";

import { envSchema } from "../schemas/env.schema";

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
