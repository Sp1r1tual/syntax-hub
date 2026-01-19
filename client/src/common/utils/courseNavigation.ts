import { ICourseNavigation, ITopic } from "../types";

interface INavigation {
  topicIndex: number;
  questionIndex: number;
  topic: ITopic;
}

export function findQuestionNavigation(
  selectedCourse: ICourseNavigation | null,
  questionId: string | undefined,
): INavigation | null {
  if (!selectedCourse || !questionId) {
    return null;
  }

  const topicIndex = selectedCourse.topics.findIndex((t) =>
    t.questions.some((q) => q.id === questionId),
  );

  if (topicIndex === -1) {
    return null;
  }

  const topic = selectedCourse.topics[topicIndex];

  if (!topic) {
    return null;
  }

  const questionIndex = topic.questions.findIndex((q) => q.id === questionId);

  return { topicIndex, questionIndex, topic };
}
