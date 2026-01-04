import { useNavigate } from "react-router-dom";

import { ITopic } from "@/types/courses";

import { useCoursesStore } from "@/store/courses/useCoursesStore";

interface INavigation {
  topicIndex: number;
  questionIndex: number;
  topic: ITopic;
}

export const useQuestionNavigation = (navigation: INavigation | null) => {
  const navigate = useNavigate();

  const { selectedCourse, getNavigationState } = useCoursesStore();

  const goPrev = () => {
    if (!selectedCourse || !navigation) return;

    const { topicIndex, questionIndex, topic } = navigation;

    if (questionIndex > 0) {
      const prevQuestion = topic.questions[questionIndex - 1];

      if (prevQuestion) {
        navigate(
          `/courses/${selectedCourse.slug}/questions/${prevQuestion.id}`,
        );
      }
    } else if (topicIndex > 0) {
      const prevTopic = selectedCourse.topics[topicIndex - 1];

      if (prevTopic) {
        const last = prevTopic.questions.at(-1);

        if (last) {
          navigate(`/courses/${selectedCourse.slug}/questions/${last.id}`);
        }
      }
    }
  };

  const goNext = () => {
    if (!selectedCourse || !navigation) return;

    const { topicIndex, questionIndex, topic } = navigation;

    if (questionIndex < topic.questions.length - 1) {
      const nextQuestion = topic.questions[questionIndex + 1];

      if (nextQuestion) {
        navigate(
          `/courses/${selectedCourse.slug}/questions/${nextQuestion.id}`,
        );
      }
    } else if (topicIndex < selectedCourse.topics.length - 1) {
      const nextTopic = selectedCourse.topics[topicIndex + 1];

      if (nextTopic) {
        const first = nextTopic.questions[0];

        if (first) {
          navigate(`/courses/${selectedCourse.slug}/questions/${first.id}`);
        }
      }
    }
  };

  const navState = getNavigationState(navigation);

  return {
    goPrev,
    goNext,
    disablePrev: navState.disablePrev,
    disableNext: navState.disableNext,
  };
};
