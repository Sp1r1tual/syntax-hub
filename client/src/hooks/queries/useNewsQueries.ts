import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { INewsResponse } from "@/common/types";

import { CommunityService } from "@/api/services/communityService";

export const newsKeys = {
  all: ["news"] as const,
  list: () => [...newsKeys.all, "list"] as const,
};

export const useNewsQueries = () => {
  return useQuery({
    queryKey: newsKeys.list(),
    queryFn: async () => {
      const response = await CommunityService.getNews();
      return response.data;
    },
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newsId: string) => {
      const response = await CommunityService.toggleLike(newsId);
      return response.data;
    },

    onMutate: async (newsId: string) => {
      await queryClient.cancelQueries({ queryKey: newsKeys.list() });

      const previousNews = queryClient.getQueryData<INewsResponse[]>(
        newsKeys.list(),
      );

      if (previousNews) {
        queryClient.setQueryData<INewsResponse[]>(
          newsKeys.list(),
          previousNews.map((item) =>
            item.id === newsId
              ? {
                  ...item,
                  liked: !item.liked,
                  likes: item.liked ? item.likes - 1 : item.likes + 1,
                }
              : item,
          ),
        );
      }

      return { previousNews };
    },

    onError: (error, _, context) => {
      if (context?.previousNews) {
        queryClient.setQueryData(newsKeys.list(), context.previousNews);
      }
      console.error("Не вдалося поставити лайк:", error);
    },

    onSuccess: (updatedNews, newsId) => {
      queryClient.setQueryData<INewsResponse[]>(newsKeys.list(), (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((item) => (item.id === newsId ? updatedNews : item));
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.list() });
    },
  });
};
