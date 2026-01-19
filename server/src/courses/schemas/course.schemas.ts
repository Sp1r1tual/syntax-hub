import { z } from "zod";

import { SocialsSchema } from "src/user/schemas/users.schemas";

export const CategoryGroupSchema = z.object({
  key: z.string(),
  title: z.string(),
});

export const CourseAuthorSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  avatar: z.string().optional(),
  socials: SocialsSchema.optional(),
});

export const QuestionStatusSchema = z.enum(["repeat", "learned"]).optional();

export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  topicId: z.string(),
  status: QuestionStatusSchema,
});

export const QuestionDetailSchema = z.object({
  id: z.string(),
  text: z.string(),
  content: z.string(),
  topicId: z.string(),
  status: QuestionStatusSchema,
});

export const TopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  courseId: z.string(),
  questions: z.array(QuestionSchema),
});

export const CourseStructureSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  icon: z.string().optional(),
  group: CategoryGroupSchema,
  authors: z.array(CourseAuthorSchema),
  topics: z.array(TopicSchema),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CourseDetailsResponseSchema = z.object({
  structure: CourseStructureSchema,
  content: z.array(QuestionDetailSchema),
});

export const ToggleQuestionStatusResponseSchema = z.object({
  questionId: z.string(),
  status: QuestionStatusSchema,
  message: z.string().optional(),
});
