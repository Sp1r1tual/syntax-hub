import { z } from "zod";

export const CourseInGroupSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  icon: z.string().optional(),
});

export const CategoryGroupWithCoursesSchema = z.object({
  key: z.string(),
  title: z.string(),
  courses: z.array(CourseInGroupSchema),
});

export const CoursesGroupedListResponseSchema = z.object({
  groups: z.array(CategoryGroupWithCoursesSchema),
});
