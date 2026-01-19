import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ICourseDetailsResponse, QuestionStatusType } from "@/common/types";

import { CoursesService } from "@/api/services/coursesService";

import { useCoursesStore } from "@/store/courses/useCoursesStore";

export const coursesKeys = {
  all: ["courses"] as const,
  lists: () => [...coursesKeys.all, "list"] as const,
  list: () => [...coursesKeys.lists()] as const,
  details: () => [...coursesKeys.all, "detail"] as const,
  detail: (slug: string) => [...coursesKeys.details(), slug] as const,
};

export const useCoursesList = () => {
  return useQuery({
    queryKey: coursesKeys.list(),
    queryFn: async () => {
      const response = await CoursesService.getCoursesList();
      return response.data;
    },
  });
};

export const useCourse = (courseSlug: string | undefined) => {
  return useQuery({
    queryKey: coursesKeys.detail(courseSlug || ""),
    queryFn: async () => {
      if (!courseSlug) throw new Error("Course slug is required");
      const response = await CoursesService.getCourse(courseSlug);
      return response.data;
    },
    enabled: !!courseSlug,
  });
};

export const useMarkQuestionAsRepeat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CoursesService.toggleQuestionAsRepeat,
    onMutate: async (questionId) => {
      const queryKeyPrefix = coursesKeys.details();
      await queryClient.cancelQueries({ queryKey: queryKeyPrefix });

      const previousQueries =
        queryClient.getQueriesData<ICourseDetailsResponse>({
          queryKey: queryKeyPrefix,
        });

      previousQueries.forEach(([key, old]) => {
        if (!old) return;

        const newContent = old.content.map((q) => {
          if (q.id !== questionId) return q;

          if (q.status === "repeat") {
            const { status: _, ...rest } = q;
            return rest;
          }

          return { ...q, status: "repeat" as QuestionStatusType };
        });

        const newData = { ...old, content: newContent };
        queryClient.setQueryData(key, newData);

        const slug = key[2] as string;
        const state = useCoursesStore.getState();
        if (state.selectedCourse?.slug === slug) {
          state.setQuestionsContent(newContent);
        }
      });

      return { previousQueries };
    },
    onError: (_e, _id, ctx) => {
      ctx?.previousQueries?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);

        if (data) {
          const slug = key[2] as string;
          const state = useCoursesStore.getState();
          if (state.selectedCourse?.slug === slug) {
            state.setQuestionsContent(data.content);
          }
        }
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.details() });
    },
  });
};

export const useMarkQuestionAsLearned = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CoursesService.toggleQuestionAsLearned,
    onMutate: async (questionId) => {
      const queryKeyPrefix = coursesKeys.details();
      await queryClient.cancelQueries({ queryKey: queryKeyPrefix });

      const previousQueries =
        queryClient.getQueriesData<ICourseDetailsResponse>({
          queryKey: queryKeyPrefix,
        });

      previousQueries.forEach(([key, old]) => {
        if (!old) return;

        const newContent = old.content.map((q) => {
          if (q.id !== questionId) return q;

          if (q.status === "learned") {
            const { status: _, ...rest } = q;
            return rest;
          }

          return { ...q, status: "learned" as QuestionStatusType };
        });

        const newData = { ...old, content: newContent };
        queryClient.setQueryData(key, newData);

        const slug = key[2] as string;
        const state = useCoursesStore.getState();
        if (state.selectedCourse?.slug === slug) {
          state.setQuestionsContent(newContent);
        }
      });

      return { previousQueries };
    },
    onError: (_e, _id, ctx) => {
      ctx?.previousQueries?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);

        if (data) {
          const slug = key[2] as string;
          const state = useCoursesStore.getState();
          if (state.selectedCourse?.slug === slug) {
            state.setQuestionsContent(data.content);
          }
        }
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.details() });
    },
  });
};
