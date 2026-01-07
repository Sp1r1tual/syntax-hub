import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { IEditComment } from "@/common/types";

import { useCommentsStore } from "@/store/courses/useCommentsStore";

import { CommentsList } from "./CommentsList";
import { CommentInput } from "./CommentInput";

import commentSvg from "@/assets/comment.svg";

import styles from "./styles/CommentsSection.module.css";

export const CommentsSection = () => {
  const { questionId } = useParams<{ questionId: string }>();

  const comments = useCommentsStore((state) => state.comments);
  const fetchComments = useCommentsStore((state) => state.fetchComments);
  const deleteComment = useCommentsStore((state) => state.deleteComment);
  const replyToComment = useCommentsStore((state) => state.replyToComment);
  const toggleLike = useCommentsStore((state) => state.toggleLike);
  const editComment = useCommentsStore((state) => state.editComment);
  const isLoading = useCommentsStore((state) => state.isLoading);
  const error = useCommentsStore((state) => state.error);

  useEffect(() => {
    if (questionId) {
      fetchComments(questionId);
    }
  }, [questionId, fetchComments]);

  const handleDelete = async (id: string) => {
    await deleteComment(id);
  };

  const handleReply = async (
    parentId: string,
    text: string,
    images: File[],
  ) => {
    await replyToComment(parentId, { text, images });
  };

  const handleLike = async (id: string) => {
    await toggleLike(id);
  };

  const handleEdit = async (id: string, text: string, images?: File[]) => {
    const editData: IEditComment = { text };

    if (images !== undefined) {
      editData.images = images;
    }

    await editComment(id, editData);
  };

  if (isLoading) {
    return <div>Завантаження коментарів...</div>;
  }

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.headerWrapper}>
        <header className={styles.header}>
          <div className={styles.title}>
            <div className={styles.head}>
              <img src={commentSvg} alt="Comments" />
              <h3>Коментарі</h3>
            </div>
            <a href="#">Прочитайте це, перш ніж коментувати</a>
          </div>
        </header>

        <div className={styles.meta}>
          <span>{comments.length} коментарів</span>
        </div>
      </div>

      <div className={styles.input}>
        {questionId && <CommentInput questionId={questionId} />}
      </div>

      <div className={styles.commentsList}>
        <CommentsList
          comments={comments}
          onDelete={handleDelete}
          onReply={handleReply}
          onLike={handleLike}
          onEdit={handleEdit}
        />
      </div>
    </section>
  );
};
