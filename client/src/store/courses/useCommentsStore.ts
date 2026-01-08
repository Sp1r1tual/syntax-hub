import { create } from "zustand";

import { ICommentData, ISendComment, IEditComment } from "@/common/types";

import { CourseCommentsService } from "@/api/services/courseCommentsService";

interface ICommentsStoreState {
  comments: ICommentData[];
  totalCount: number;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  currentQuestionId: string | null;
  setComments: (comments: ICommentData[]) => void;
  fetchComments: (questionId: string) => Promise<void>;
  sendComment: (
    questionId: string,
    data: Omit<ISendComment, "questionId">,
  ) => Promise<void>;
  replyToComment: (
    commentId: string,
    data: Omit<ISendComment, "questionId">,
  ) => Promise<void>;
  editComment: (commentId: string, data: IEditComment) => Promise<void>;
  toggleLike: (commentId: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
}

export const useCommentsStore = create<ICommentsStoreState>((set, get) => ({
  comments: [],
  totalCount: 0,
  isLoading: false,
  isSubmitting: false,
  error: null,
  currentQuestionId: null,

  setComments: (comments) => set({ comments }),

  async fetchComments(questionId) {
    const { isLoading, currentQuestionId } = get();

    if (isLoading || currentQuestionId === questionId) {
      return;
    }

    try {
      set({ isLoading: true, error: null, currentQuestionId: questionId });

      const { data } = await CourseCommentsService.getComments(questionId);

      set({ comments: data, totalCount: data.length });
    } catch {
      set({
        error: "Не вдалося завантажити коментарі",
        currentQuestionId: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  async sendComment(questionId, data) {
    try {
      set({ isSubmitting: true, error: null });

      const { data: newComment } = await CourseCommentsService.sendComment(
        questionId,
        data,
      );

      set((state) => ({
        comments: [newComment, ...state.comments],
        totalCount: state.totalCount + 1,
      }));
    } catch {
      set({ error: "Не вдалося додати коментар" });
    } finally {
      set({ isSubmitting: false });
    }
  },

  async replyToComment(commentId, data) {
    try {
      set({ isSubmitting: true, error: null });

      const { data: reply } = await CourseCommentsService.replyToComment(
        commentId,
        data,
      );

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

      set((state) => ({
        comments: addReply(state.comments),
      }));
    } catch {
      set({ error: "Не вдалося відповісти на коментар" });
    } finally {
      set({ isSubmitting: false });
    }
  },

  async editComment(commentId, data) {
    try {
      set({ isSubmitting: true, error: null });

      const { data: updated } = await CourseCommentsService.editComment(
        commentId,
        data,
      );

      const update = (comments: ICommentData[]): ICommentData[] =>
        comments.map((comment) =>
          comment.id === updated.id
            ? updated
            : {
                ...comment,
                replies: update(comment.replies),
              },
        );

      set((state) => ({
        comments: update(state.comments),
      }));
    } catch {
      set({ error: "Не вдалося відредагувати коментар" });
    } finally {
      set({ isSubmitting: false });
    }
  },

  async toggleLike(commentId) {
    try {
      const { data: updated } =
        await CourseCommentsService.toggleLike(commentId);

      const updateComment = (comments: ICommentData[]): ICommentData[] =>
        comments.map((comment) =>
          comment.id === commentId
            ? updated
            : {
                ...comment,
                replies: updateComment(comment.replies),
              },
        );

      set((state) => ({
        comments: updateComment(state.comments),
      }));
    } catch {
      set({ error: "Не вдалося поставити лайк" });
    }
  },

  async deleteComment(commentId) {
    try {
      set({ isSubmitting: true, error: null });

      await CourseCommentsService.deleteComment(commentId);

      const markDeleted = (comments: ICommentData[]): ICommentData[] =>
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                deletedAt: new Date().toISOString(),
                text: "[Deleted]",
              }
            : {
                ...comment,
                replies: markDeleted(comment.replies),
              },
        );

      set((state) => ({
        comments: markDeleted(state.comments),
        totalCount: state.totalCount - 1,
      }));
    } catch {
      set({ error: "Не вдалося видалити коментар" });
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
