import { create } from "zustand";

import { INewsResponse } from "@/common/types";

import { CommunityService } from "@/api/services/communityService";

interface INewsState {
  newsList: INewsResponse[];
  isLoadingNews: boolean;
  error: string | null;
  isFetched: boolean;

  fetchNews: (force?: boolean) => Promise<void>;
  toggleLike: (newsId: string) => void;
}

const useNewsStore = create<INewsState>((set, get) => ({
  newsList: [],
  isLoadingNews: false,
  error: null,
  isFetched: false,

  fetchNews: async () => {
    const { isFetched } = get();

    if (isFetched) {
      return;
    }

    set({ isLoadingNews: true, error: null });

    try {
      const response = await CommunityService.getNews();
      set({
        newsList: response.data,
        isLoadingNews: false,
        isFetched: true,
        error: null,
      });
    } catch (error) {
      console.error(error);
      set({
        error: "Не вдалося завантажити список новин",
        isLoadingNews: false,
        isFetched: false,
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
