import { useEffect } from "react";

import { useCoursesStore } from "@/store/courses/useCoursesStore";

import { Courses } from "@/components/sections/courses/Courses";
import { CoursesSkeleton } from "@/components/ui/skeletons/CoursesSkeleton";
import { Empty } from "@/components/ui/content/Empty";
import { ErrorWrapper } from "@/components/errors/ErrorWpapper";

export const CoursesListPage = () => {
  const { error, fetchCoursesList, isLoadingList, isFetchedList, coursesList } =
    useCoursesStore();

  useEffect(() => {
    if (!isFetchedList && !isLoadingList) {
      fetchCoursesList();
    }
  }, [fetchCoursesList, isFetchedList, isLoadingList]);

  if (isLoadingList || !isFetchedList) {
    return <CoursesSkeleton />;
  }

  if (error) {
    return <ErrorWrapper error={error} />;
  }

  if (coursesList.length === 0) {
    return (
      <Empty
        title="Курси поки що відсутні"
        description="Ми активно працюємо над наповненням платформи контентом. Незабаром тут з'являться курси!"
      />
    );
  }

  return <Courses />;
};
