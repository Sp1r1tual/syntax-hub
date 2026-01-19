import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ICommentData, ISendComment, IEditComment } from "@/common/types";

import { CourseCommentsService } from "@/api/services/courseCommentsService";

export const commentsKeys = {
  all: ["comments"] as const,
  byQuestion: (questionId: string) => ["comments", questionId] as const,
};

export const useComments = (questionId: string | undefined) => {
  return useQuery({
    queryKey: questionId ? commentsKeys.byQuestion(questionId) : [],
    queryFn: async () => {
      if (!questionId) throw new Error("Question ID is required");
      const { data } = await CourseCommentsService.getComments(questionId);
      return data;
    },
    enabled: !!questionId,
  });
};

export const useSendComment = (questionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<ISendComment, "questionId">) => {
      const { data: newComment } = await CourseCommentsService.sendComment(
        questionId,
        data,
      );
      return newComment;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: commentsKeys.byQuestion(questionId),
      });

      const previousComments = queryClient.getQueryData<ICommentData[]>(
        commentsKeys.byQuestion(questionId),
      );

      return { previousComments };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          commentsKeys.byQuestion(questionId),
          context.previousComments,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: commentsKeys.byQuestion(questionId),
      });
    },
  });
};

export const useReplyToComment = (questionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commentId,
      data,
    }: {
      commentId: string;
      data: Omit<ISendComment, "questionId">;
    }) => {
      const { data: reply } = await CourseCommentsService.replyToComment(
        commentId,
        data,
      );
      return { commentId, reply };
    },
    onMutate: async ({ commentId }) => {
      await queryClient.cancelQueries({
        queryKey: commentsKeys.byQuestion(questionId),
      });

      const previousComments = queryClient.getQueryData<ICommentData[]>(
        commentsKeys.byQuestion(questionId),
      );

      return { previousComments, commentId };
    },
    onSuccess: ({ commentId, reply }) => {
      const addReply = (comments: ICommentData[]): ICommentData[] =>
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...comment.replies, reply],
            };
          }
          return {
            ...comment,
            replies: addReply(comment.replies),
          };
        });

      queryClient.setQueryData<ICommentData[]>(
        commentsKeys.byQuestion(questionId),
        (old) => (old ? addReply(old) : []),
      );
    },
    onError: (_error, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          commentsKeys.byQuestion(questionId),
          context.previousComments,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: commentsKeys.byQuestion(questionId),
      });
    },
  });
};

export const useEditComment = (questionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commentId,
      data,
    }: {
      commentId: string;
      data: IEditComment;
    }) => {
      const { data: updated } = await CourseCommentsService.editComment(
        commentId,
        data,
      );
      return updated;
    },
    onMutate: async ({ commentId, data }) => {
      await queryClient.cancelQueries({
        queryKey: commentsKeys.byQuestion(questionId),
      });

      const previousComments = queryClient.getQueryData<ICommentData[]>(
        commentsKeys.byQuestion(questionId),
      );

      const updateOptimistic = (comments: ICommentData[]): ICommentData[] =>
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              text: data.text,
              updatedAt: new Date().toISOString(),
            };
          }
          return {
            ...comment,
            replies: updateOptimistic(comment.replies),
          };
        });

      queryClient.setQueryData<ICommentData[]>(
        commentsKeys.byQuestion(questionId),
        (old) => (old ? updateOptimistic(old) : []),
      );

      return { previousComments };
    },
    onSuccess: (updatedComment) => {
      const update = (comments: ICommentData[]): ICommentData[] =>
        comments.map((comment) =>
          comment.id === updatedComment.id
            ? updatedComment
            : {
                ...comment,
                replies: update(comment.replies),
              },
        );

      queryClient.setQueryData<ICommentData[]>(
        commentsKeys.byQuestion(questionId),
        (old) => (old ? update(old) : []),
      );
    },
    onError: (_error, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          commentsKeys.byQuestion(questionId),
          context.previousComments,
        );
      }
    },
  });
};

export const useToggleLike = (questionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      const { data } = await CourseCommentsService.toggleLike(commentId);
      return data;
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({
        queryKey: commentsKeys.byQuestion(questionId),
      });

      const previousComments = queryClient.getQueryData<ICommentData[]>(
        commentsKeys.byQuestion(questionId),
      );

      const updateLike = (comments: ICommentData[]): ICommentData[] =>
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            };
          }
          return {
            ...comment,
            replies: updateLike(comment.replies),
          };
        });

      queryClient.setQueryData<ICommentData[]>(
        commentsKeys.byQuestion(questionId),
        (old) => (old ? updateLike(old) : []),
      );

      return { previousComments };
    },
    onError: (_error, _commentId, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          commentsKeys.byQuestion(questionId),
          context.previousComments,
        );
      }
    },
    onSuccess: (updatedComment) => {
      const updateFromServer = (comments: ICommentData[]): ICommentData[] =>
        comments.map((comment) => {
          if (comment.id === updatedComment.id) {
            return updatedComment;
          }
          return {
            ...comment,
            replies: updateFromServer(comment.replies),
          };
        });

      queryClient.setQueryData<ICommentData[]>(
        commentsKeys.byQuestion(questionId),
        (old) => (old ? updateFromServer(old) : []),
      );
    },
  });
};

export const useDeleteComment = (questionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      await CourseCommentsService.deleteComment(commentId);
      return commentId;
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({
        queryKey: commentsKeys.byQuestion(questionId),
      });

      const previousComments = queryClient.getQueryData<ICommentData[]>(
        commentsKeys.byQuestion(questionId),
      );

      const markDeleted = (comments: ICommentData[]): ICommentData[] =>
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              deletedAt: new Date().toISOString(),
              text: "[Deleted]",
            };
          }
          return {
            ...comment,
            replies: markDeleted(comment.replies),
          };
        });

      queryClient.setQueryData<ICommentData[]>(
        commentsKeys.byQuestion(questionId),
        (old) => (old ? markDeleted(old) : []),
      );

      return { previousComments };
    },
    onError: (_error, _commentId, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          commentsKeys.byQuestion(questionId),
          context.previousComments,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: commentsKeys.byQuestion(questionId),
      });
    },
  });
};
