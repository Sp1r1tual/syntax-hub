import { create } from "zustand";

import {
  IGroupCourses,
  ICourseNavigation,
  IQuestionDetail,
  ITopic,
  QuestionStatusType,
} from "@/common/types";

import { CoursesService } from "@/api/services/coursesService";

import { optimisticToggleQuestionStatus } from "@/common/utils/optimisticUpdates";

interface ICoursesState {
  coursesList: IGroupCourses[];
  isLoadingList: boolean;
  isFetchedList: boolean;
  selectedCourse: ICourseNavigation | null;
  questionsContent: Map<string, IQuestionDetail>;
  isMarkingQuestion: boolean;
  isLoadingCourse: boolean;
  error: string | null;
  fetchCoursesList: () => Promise<void>;
  setCoursesList: (groups: IGroupCourses[]) => void;
  fetchCourse: (courseSlug: string) => Promise<void>;
  markQuestionAsRepeat: (questionId: string) => Promise<void>;
  markQuestionAsLearned: (questionId: string) => Promise<void>;
  updateQuestionStatus: (
    questionId: string,
    status: QuestionStatusType | undefined,
  ) => void;
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
  setError: (message: string | null) => void;
  clearSelectedCourse: () => void;
}

const useCoursesStore = create<ICoursesState>((set, get) => ({
  coursesList: [],
  selectedCourse: null,
  questionsContent: new Map(),
  isLoadingList: false,
  isMarkingQuestion: false,
  isFetchedList: false,
  isLoadingCourse: false,
  error: null,

  setCoursesList: (groups) => set({ coursesList: groups }),

  setSelectedCourse: (course) => set({ selectedCourse: course }),

  setQuestionsContent: (content) => {
    const contentMap = new Map(content.map((q) => [q.id, q]));
    set({ questionsContent: contentMap });
  },

  setError: (error) => set({ error }),

  fetchCoursesList: async () => {
    set({ isLoadingList: true, error: null });

    try {
      const response = await CoursesService.getCoursesList();

      set({
        coursesList: response.data.groups,
        isLoadingList: false,
        isFetchedList: true,
      });
    } catch (error) {
      console.error("Error fetching courses list:", error);
      set({
        error: "Не вдалося завантажити список курсів",
        isLoadingList: false,
      });
    }
  },

  fetchCourse: async (courseSlug: string) => {
    set({
      isLoadingCourse: true,
      error: null,
      selectedCourse: null,
      questionsContent: new Map(),
    });

    try {
      const response = await CoursesService.getCourse(courseSlug);
      const contentMap = new Map(response.data.content.map((q) => [q.id, q]));

      set({
        selectedCourse: response.data.structure,
        questionsContent: contentMap,
        isLoadingCourse: false,
      });
    } catch (error) {
      console.error("Error fetching course:", error);
      set({
        error: "Не вдалося завантажити курс",
        isLoadingCourse: false,
      });
    }
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

  updateQuestionStatus: (
    questionId: string,
    status: QuestionStatusType | undefined,
  ) => {
    const state = get();
    const question = state.questionsContent.get(questionId);

    if (question) {
      const updatedQuestion = { ...question };

      if (status === undefined) {
        delete updatedQuestion.status;
      } else {
        updatedQuestion.status = status;
      }

      const newMap = new Map(state.questionsContent);
      newMap.set(questionId, updatedQuestion);

      set({ questionsContent: newMap });
    }
  },

  markQuestionAsRepeat: async (questionId: string) => {
    set({ isMarkingQuestion: true, error: null });

    await optimisticToggleQuestionStatus(
      questionId,
      "repeat",
      get().questionsContent,
      get().updateQuestionStatus,
      () => CoursesService.toggleQuestionAsRepeat(questionId),
      (error) => {
        console.error("Error marking question as repeat:", error);
        set({ error: "Не вдалося відмітити питання для повторення" });
      },
    );

    set({ isMarkingQuestion: false });
  },

  markQuestionAsLearned: async (questionId: string) => {
    set({ isMarkingQuestion: true, error: null });

    await optimisticToggleQuestionStatus(
      questionId,
      "learned",
      get().questionsContent,
      get().updateQuestionStatus,
      () => CoursesService.toggleQuestionAsLearned(questionId),
      (error) => {
        console.error("Error marking question as learned:", error);
        set({ error: "Не вдалося відмітити питання як вивчене" });
      },
    );

    set({ isMarkingQuestion: false });
  },

  clearSelectedCourse: () => {
    set({
      selectedCourse: null,
      questionsContent: new Map(),
      error: null,
    });
  },
}));

export { useCoursesStore };
