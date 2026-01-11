import { create } from "zustand";

import { INewsResponse } from "@/common/types";

import { CommunityService } from "@/api/services/communityService";

import { optimisticToggleLikeNews } from "@/common/utils/optimisticUpdates";

interface INewsState {
  newsList: INewsResponse[];
  isLoadingNews: boolean;
  error: string | null;
  isFetched: boolean;

  fetchNews: (force?: boolean) => Promise<void>;
  toggleLike: (newsId: string) => Promise<void>;
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
    await optimisticToggleLikeNews(
      newsId,
      get().newsList,
      (newsList) => set({ newsList }),
      async () => {
        const response = await CommunityService.toggleLike(newsId);
        return response.data;
      },
      (error) => {
        console.error("Не вдалося поставити лайк:", error);
        set({ error: "Не вдалося поставити лайк" });
      },
    );
  },
}));

export { useNewsStore };
