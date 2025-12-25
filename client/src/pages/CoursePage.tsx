import { useParams, Navigate } from "react-router-dom";

import { CourseContent } from "@/components/ui/sections/CourseContent";

import { courses } from "@/data/courses/courses";

export const CoursePage = () => {
  const { courseSlug } = useParams();

  const course = courses.find((course) => course.slug === courseSlug);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return <CourseContent course={course} />;
};
