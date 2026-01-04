import { useEffect } from "react";

import { useCoursesStore } from "@/store/courses/useCoursesStore";

import { Courses } from "@/components/ui/sections/courses/Courses";
import { ErrorWrapper } from "@/components/errors/ErrorWpapper";

export const CoursesListPage = () => {
  const { error, fetchCoursesList, isLoadingList, coursesList } =
    useCoursesStore();

  useEffect(() => {
    if (!coursesList || coursesList.length === 0) {
      fetchCoursesList();
    }
  }, [coursesList, fetchCoursesList]);

  if (isLoadingList) {
    return <div style={{ minHeight: "100dvh" }} />;
  }

  if (error) return <ErrorWrapper error={error} />;

  return (
    <>
      <Courses />
    </>
  );
};
