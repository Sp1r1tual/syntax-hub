import { z } from "zod";

export const CodeLanguageSchema = z.enum([
  "javascript",
  "typescript",
  "ts",
  "html",
  "css",
  "json",
  "bash",
  "shell",
  "markdown",
  "yaml",
  "sql",
  "python",
  "java",
  "csharp",
]);

export const CodeBlockSchema = z.object({
  id: z.string(),
  type: z.literal("CODE"),
  language: CodeLanguageSchema,
  content: z.string(),
});
