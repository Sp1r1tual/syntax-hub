import { ICommentData, IEditComment, ISendComment } from "@/common/types";

import { $apiMain } from "@/api";

export class CourseCommentsService {
  static getComments(questionId: string) {
    return $apiMain.get<ICommentData[]>(`/courses/comments/${questionId}`);
  }

  static sendComment(data: ISendComment) {
    const formData = new FormData();

    formData.append("questionId", data.questionId);
    formData.append("text", data.text);

    data.images?.forEach((img) => formData.append("images", img));

    return $apiMain.post<ICommentData>(`/courses/comments`, formData);
  }

  static replyToComment(
    commentId: string,
    data: Omit<ISendComment, "questionId">,
  ) {
    const formData = new FormData();

    formData.append("text", data.text);
    data.images?.forEach((img) => formData.append("images", img));

    return $apiMain.post<ICommentData>(
      `/courses/comments/${commentId}/reply`,
      formData,
    );
  }

  static toggleLike(commentId: string) {
    return $apiMain.patch<{ likes: number }>(
      `/courses/comments/${commentId}/like`,
    );
  }

  static editComment(commentId: string, data: IEditComment) {
    const formData = new FormData();

    formData.append("text", data.text);
    data.images?.forEach((img) => formData.append("images", img));

    return $apiMain.patch<ICommentData>(
      `/courses/comments/${commentId}`,
      formData,
    );
  }
}
