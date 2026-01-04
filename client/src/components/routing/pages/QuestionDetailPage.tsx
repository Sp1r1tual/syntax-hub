import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useQuestionNavigation } from "@/hooks/ui/useQuestionNavigation";

import { useCoursesStore } from "@/store/courses/useCoursesStore";
import { useCourseSidebarStore } from "@/store/ui/useCourseSidebarStore";

import { QuestionContent } from "@/components/ui/sections/courses/QuestionContent";
import { PrevNextButtons } from "@/components/ui/buttons/PrevNextButtons";
import { MobileTopicsModal } from "@/components/ui/modals/MobileTopicsModal";
import { ErrorWrapper } from "@/components/errors/ErrorWpapper";

import { findQuestionNavigation } from "@/common/utils/courseNavigation";

export const QuestionDetailPage = () => {
  const { questionId } = useParams();

  const { setTopic } = useCourseSidebarStore();

  const { selectedCourse, getQuestionDetail, isLoadingCourse } =
    useCoursesStore();

  const navigation = findQuestionNavigation(selectedCourse, questionId);

  const { goPrev, goNext, disablePrev, disableNext } =
    useQuestionNavigation(navigation);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [questionId]);

  useEffect(() => {
    if (navigation) {
      setTopic(navigation.topic.id, true);
    }
  }, [navigation, setTopic]);

  if (isLoadingCourse || !selectedCourse) {
    return null;
  }

  const question = questionId ? getQuestionDetail(questionId) : undefined;

  if (!question || !navigation) {
    return <ErrorWrapper error="Питання не знайдено" />;
  }

  return (
    <>
      <MobileTopicsModal />

      <QuestionContent question={question} />

      <PrevNextButtons
        textBack="Попередня тема"
        textNext="Наступна тема"
        onPrev={goPrev}
        onNext={goNext}
        disablePrev={disablePrev}
        disableNext={disableNext}
      />
    </>
  );
};
