import { useCoursesList } from "@/hooks/queries/useCoursesQueries";

import { Courses } from "@/components/sections/courses/Courses";
import { CoursesSkeleton } from "@/components/ui/skeletons/CoursesSkeleton";
import { Empty } from "@/components/ui/content/Empty";
import { ErrorWrapper } from "@/components/errors/ErrorWpapper";

export const CoursesListPage = () => {
  const { data, isLoading, error } = useCoursesList();

  if (isLoading) {
    return <CoursesSkeleton />;
  }

  if (error) {
    return <ErrorWrapper error="Не вдалося завантажити список курсів" />;
  }

  if (!data || data.groups.length === 0) {
    return (
      <Empty
        title="Курси поки що відсутні"
        description="Ми активно працюємо над наповненням платформи контентом. Незабаром тут з'являться курси!"
      />
    );
  }

  return <Courses coursesList={data.groups} />;
};
