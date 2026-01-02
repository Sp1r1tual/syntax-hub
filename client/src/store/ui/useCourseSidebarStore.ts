import { create } from "zustand";

interface ICourseSidebarStore {
  openTopics: Record<string, boolean>;
  setTopic: (topicId: string, value: boolean) => void;
  toggleTopic: (topicId: string) => void;
}

export const useCourseSidebarStore = create<ICourseSidebarStore>((set) => ({
  openTopics: {},

  setTopic: (topicId, value) =>
    set((state) => ({ openTopics: { ...state.openTopics, [topicId]: value } })),

  toggleTopic: (topicId) =>
    set((state) => ({
      openTopics: {
        ...state.openTopics,
        [topicId]: !state.openTopics[topicId],
      },
    })),
}));
