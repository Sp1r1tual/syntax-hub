import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { CourseContent } from "@/components/ui/sections/CourseContent";
import { useCoursesStore } from "@/store/courses/useCoursesStore";

export const CoursePage = () => {
  const { courseSlug } = useParams();

  const { fetchCourse, clearSelectedCourse } = useCoursesStore();

  useEffect(() => {
    if (courseSlug) {
      fetchCourse(courseSlug);
    }

    return () => {
      clearSelectedCourse();
    };
  }, [courseSlug, fetchCourse, clearSelectedCourse]);

  return <CourseContent />;
};
