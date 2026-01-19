import { z } from "zod";

const urlValidator = z.string().refine(
  (val) => {
    if (!val) return true;
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  },
  {
    message: "Must be a valid URL",
  },
);

export const SocialsSchema = z
  .object({
    telegramUrl: urlValidator
      .optional()
      .or(z.literal(""))
      .refine((val) => val === "" || val !== "", {
        message: "Telegram URL must be a valid URL",
      }),
    githubUrl: urlValidator
      .optional()
      .or(z.literal(""))
      .refine((val) => val === "" || val !== "", {
        message: "GitHub URL must be a valid URL",
      }),
    instagramUrl: urlValidator
      .optional()
      .or(z.literal(""))
      .refine((val) => val === "" || val !== "", {
        message: "Instagram URL must be a valid URL",
      }),
  })
  .optional();
