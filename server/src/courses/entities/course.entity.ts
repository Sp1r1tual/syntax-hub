import { Prisma } from "@prisma/client";

export const categoryGroupIncludeWithCourses = () => ({
  courses: {
    orderBy: {
      order: "asc" as const,
    },
    select: {
      slug: true,
      title: true,
      description: true,
      icon: true,
    },
  },
});

export type CategoryGroupWithCourses = Prisma.CategoryGroupGetPayload<{
  include: ReturnType<typeof categoryGroupIncludeWithCourses>;
}>;

export const courseIncludeBasic = () => ({
  group: true,
  author: {
    select: {
      id: true,
      name: true,
    },
  },
});

export const courseIncludeWithTopics = () => ({
  ...courseIncludeBasic(),
  topics: {
    orderBy: {
      order: "asc" as const,
    },
    include: {
      questions: {
        orderBy: {
          order: "asc" as const,
        },
      },
    },
  },
});

export type CourseWithTopics = Prisma.CourseGetPayload<{
  include: ReturnType<typeof courseIncludeWithTopics>;
}>;
