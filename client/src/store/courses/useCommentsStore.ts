import { create } from "zustand";

import { ICommentData, ISendComment, IEditComment } from "@/common/types";
import { CourseCommentsService } from "@/api/services/courseCommentsService";

interface ICommentsStoreState {
  comments: ICommentData[];
  isLoading: boolean;
  error: string | null;
  setComments: (comments: ICommentData[]) => void;
  fetchComments: (questionId: string) => Promise<void>;
  sendComment: (data: ISendComment) => Promise<void>;
  replyToComment: (
    commentId: string,
    data: Omit<ISendComment, "questionId">,
  ) => Promise<void>;
  editComment: (commentId: string, data: IEditComment) => Promise<void>;
  toggleLike: (commentId: string) => Promise<void>;
  deleteComment: (commentId: string) => void;
}

export const useCommentsStore = create<ICommentsStoreState>((set) => ({
  comments: [],
  isLoading: false,
  error: null,

  setComments: (comments) => set({ comments }),

  async fetchComments(questionId) {
    try {
      set({ isLoading: true, error: null });

      const { data } = await CourseCommentsService.getComments(questionId);

      set({ comments: data });
    } catch {
      set({ error: "Не вдалося завантажити коментарі" });
    } finally {
      set({ isLoading: false });
    }
  },

  async sendComment(data) {
    try {
      const { data: newComment } =
        await CourseCommentsService.sendComment(data);

      set((state) => ({
        comments: [newComment, ...state.comments],
      }));
    } catch {
      set({ error: "Не вдалося додати коментар" });
    }
  },

  async replyToComment(commentId, data) {
    try {
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
    }
  },

  async editComment(commentId, data) {
    try {
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
    }
  },

  async toggleLike(commentId) {
    try {
      const { data } = await CourseCommentsService.toggleLike(commentId);

      const updateLikes = (comments: ICommentData[]): ICommentData[] =>
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: data.likes }
            : {
                ...comment,
                replies: updateLikes(comment.replies),
              },
        );

      set((state) => ({
        comments: updateLikes(state.comments),
      }));
    } catch {
      set({ error: "Не вдалося поставити лайк" });
    }
  },

  deleteComment(commentId) {
    const markDeleted = (comments: ICommentData[]): ICommentData[] =>
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, deletedAt: new Date() }
          : {
              ...comment,
              replies: markDeleted(comment.replies),
            },
      );

    set((state) => ({
      comments: markDeleted(state.comments),
    }));
  },
}));
