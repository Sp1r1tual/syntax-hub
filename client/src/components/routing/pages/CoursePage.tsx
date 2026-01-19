import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";

import { useCourse } from "@/hooks/queries/useCoursesQueries";
import { useCoursesStore } from "@/store/courses/useCoursesStore";

import { CourseContent } from "@/components/sections/courses/CourseContent";
import { CourseContentSkeleton } from "@/components/ui/skeletons/CourseContentSkeleton";

export const CoursePage = () => {
  const { courseSlug, questionId } = useParams();

  const { setSelectedCourse, setQuestionsContent } = useCoursesStore();
  const { data, isLoading } = useCourse(courseSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [questionId]);

  useEffect(() => {
    if (data) {
      setSelectedCourse(data.structure);
      setQuestionsContent(data.content);
    }

    return () => {
      if (!questionId) {
        setSelectedCourse(null);
        setQuestionsContent([]);
      }
    };
  }, [data, setSelectedCourse, setQuestionsContent, questionId]);

  if (isLoading) {
    return <CourseContentSkeleton />;
  }

  if (questionId) {
    return <Outlet />;
  }

  return <CourseContent />;
};
