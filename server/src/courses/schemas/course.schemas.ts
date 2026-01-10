import { z } from "zod";

export const CategoryGroupSchema = z.object({
  key: z.string(),
  title: z.string(),
});

export const CourseAuthorSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
});

export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  topicId: z.string(),
});

export const QuestionDetailSchema = z.object({
  id: z.string(),
  text: z.string(),
  content: z.string(),
  topicId: z.string(),
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
  author: CourseAuthorSchema.nullable(),
  topics: z.array(TopicSchema),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CourseDetailsResponseSchema = z.object({
  structure: CourseStructureSchema,
  content: z.array(QuestionDetailSchema),
});
