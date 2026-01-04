import { create } from "zustand";

import { INewsResponse } from "@/common/types";

import { CommunityService } from "@/api/services/communityService";

interface INewsState {
  newsList: INewsResponse[];
  isLoadingNews: boolean;
  error: string | null;

  fetchNews: () => Promise<void>;
  toggleLike: (newsId: string) => void;
}

const useNewsStore = create<INewsState>((set) => ({
  newsList: [],
  isLoadingNews: false,
  error: null,

  fetchNews: async () => {
    set({ isLoadingNews: true, error: null });

    try {
      const response = await CommunityService.getNews();
      set({ newsList: response.data, isLoadingNews: false });
    } catch (error) {
      console.error(error);
      set({
        error: "Не вдалося завантажити список новин",
        isLoadingNews: false,
      });
    }
  },

  toggleLike: async (newsId: string) => {
    try {
      const response = await CommunityService.toggleLike(newsId);
      const updatedNews = response.data;

      set((state) => ({
        newsList: state.newsList.map((news) =>
          news.id === newsId ? updatedNews : news,
        ),
      }));
    } catch (error) {
      console.error("Не вдалося поставити лайк:", error);
    }
  },
}));

export { useNewsStore };
