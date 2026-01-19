import { create } from "zustand";

import { ICourseNavigation, IQuestionDetail, ITopic } from "@/common/types";

interface ICoursesState {
  selectedCourse: ICourseNavigation | null;
  questionsContent: Map<string, IQuestionDetail>;
  setSelectedCourse: (course: ICourseNavigation | null) => void;
  setQuestionsContent: (content: IQuestionDetail[]) => void;
  getQuestionDetail: (questionId: string) => IQuestionDetail | undefined;
  getNavigationState: (
    navigation: {
      topicIndex: number;
      questionIndex: number;
      topic: ITopic;
    } | null,
  ) => {
    disablePrev: boolean;
    disableNext: boolean;
  };
  clearSelectedCourse: () => void;
}

const useCoursesStore = create<ICoursesState>((set, get) => ({
  selectedCourse: null,
  questionsContent: new Map(),

  setSelectedCourse: (course) => set({ selectedCourse: course }),

  setQuestionsContent: (content) => {
    const contentMap = new Map(content.map((q) => [q.id, q]));
    set({ questionsContent: contentMap });
  },

  getNavigationState: (
    navigation: {
      topicIndex: number;
      questionIndex: number;
      topic: ITopic;
    } | null,
  ) => {
    const state = get();

    if (!navigation || !state.selectedCourse) {
      return {
        disablePrev: true,
        disableNext: true,
      };
    }

    const { topicIndex, questionIndex, topic } = navigation;
    const disablePrev = topicIndex === 0 && questionIndex === 0;

    let nextQuestionExists = false;
    const nextQ = topic.questions[questionIndex + 1];

    if (nextQ && state.getQuestionDetail(nextQ.id)) {
      nextQuestionExists = true;
    } else {
      const nextTopic = state.selectedCourse.topics[topicIndex + 1];

      if (nextTopic && nextTopic.questions.length > 0) {
        const firstQ = nextTopic.questions[0];

        if (firstQ && state.getQuestionDetail(firstQ.id)) {
          nextQuestionExists = true;
        }
      }
    }

    return {
      disablePrev,
      disableNext: !nextQuestionExists,
    };
  },

  getQuestionDetail: (questionId: string) => {
    return get().questionsContent.get(questionId);
  },

  clearSelectedCourse: () => {
    set({
      selectedCourse: null,
      questionsContent: new Map(),
    });
  },
}));

export { useCoursesStore };
