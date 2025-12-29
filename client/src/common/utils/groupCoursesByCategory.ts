import { courses } from "@/common/data/courses/courses";

export const groupCoursesByCategory = () => {
  return courses.reduce(
    (acc, course) => {
      const key = course.category;

      if (!acc[key]) {
        acc[key] = {
          title: course.categoryTitle,
          courses: [],
        };
      }

      acc[key].courses.push(course);
      return acc;
    },
    {} as Record<string, { title: string; courses: typeof courses }>,
  );
};
