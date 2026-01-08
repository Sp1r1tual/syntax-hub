import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";

import { useCoursesStore } from "@/store/courses/useCoursesStore";

import { CourseContent } from "@/components/sections/courses/CourseContent";

export const CoursePage = () => {
  const { courseSlug, questionId } = useParams();

  const { selectedCourse, fetchCourse, isLoadingCourse } = useCoursesStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [questionId]);

  useEffect(() => {
    if (
      courseSlug &&
      (!selectedCourse || selectedCourse.slug !== courseSlug) &&
      !isLoadingCourse
    ) {
      fetchCourse(courseSlug);
    }
  }, [courseSlug, selectedCourse, isLoadingCourse, fetchCourse]);

  if (isLoadingCourse) {
    return <div style={{ minHeight: "100dvh" }} />;
  }

  if (questionId) {
    return <Outlet />;
  }

  return (
    <>
      <CourseContent />
    </>
  );
};
