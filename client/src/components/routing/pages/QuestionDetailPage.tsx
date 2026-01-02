import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCoursesStore } from "@/store/courses/useCoursesStore";
import { useCourseSidebarStore } from "@/store/ui/useCourseSidebarStore";

import { QuestionContent } from "@/components/ui/sections/QuestionContent";
import { PrevNextButtons } from "@/components/ui/buttons/PrevNextButtons";
import { MobileTopicsModal } from "@/components/ui/modals/MobileTopicsModal";

export const QuestionDetailPage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const { selectedCourse, getQuestionDetail, isLoadingCourse } =
    useCoursesStore();

  const { setTopic } = useCourseSidebarStore();

  const question = questionId ? getQuestionDetail(questionId) : undefined;

  const navigation = (() => {
    if (!selectedCourse || !questionId) return null;

    const topicIndex = selectedCourse.topics.findIndex((t) =>
      t.questions.some((q) => q.id === questionId),
    );

    if (topicIndex === -1) return null;

    const topic = selectedCourse.topics[topicIndex];

    if (!topic) return null;

    const questionIndex = topic.questions.findIndex((q) => q.id === questionId);

    return { topicIndex, questionIndex, topic };
  })();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [questionId]);

  useEffect(() => {
    if (navigation && navigation.topic) {
      setTopic(navigation.topic.id, true);
    }
  }, [navigation, setTopic]);

  if (!selectedCourse && isLoadingCourse)
    return <div style={{ minHeight: "100dvh" }} />;

  if (!question || !navigation) {
    return <div>Питання не знайдено</div>;
  }

  const { topicIndex, questionIndex, topic } = navigation;

  const goPrev = () => {
    if (questionIndex > 0) {
      navigate(
        `/courses/${selectedCourse!.slug}/questions/${topic!.questions[questionIndex - 1]!.id}`,
      );
    } else if (topicIndex > 0) {
      const prevTopic = selectedCourse!.topics[topicIndex - 1]!;
      const last = prevTopic.questions.at(-1);
      if (last) {
        navigate(`/courses/${selectedCourse!.slug}/questions/${last.id}`);
      }
    }
  };

  const goNext = () => {
    if (questionIndex < topic.questions.length - 1) {
      navigate(
        `/courses/${selectedCourse!.slug}/questions/${topic!.questions[questionIndex + 1]!.id}`,
      );
    } else if (topicIndex < selectedCourse!.topics.length - 1) {
      const nextTopic = selectedCourse!.topics[topicIndex + 1]!;
      const first = nextTopic.questions[0];
      if (first) {
        navigate(`/courses/${selectedCourse!.slug}/questions/${first.id}`);
      }
    }
  };

  let nextQuestionExists = false;

  if (selectedCourse) {
    const nextQ = topic.questions[questionIndex + 1];

    if (nextQ && getQuestionDetail(nextQ.id)) {
      nextQuestionExists = true;
    } else {
      const nextTopic = selectedCourse.topics[topicIndex + 1];
      if (nextTopic && nextTopic.questions.length > 0) {
        const firstQ = nextTopic.questions[0];

        if (firstQ && getQuestionDetail(firstQ.id)) {
          nextQuestionExists = true;
        }
      }
    }
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
        disablePrev={topicIndex === 0 && questionIndex === 0}
        disableNext={!nextQuestionExists}
      />
    </>
  );
};
