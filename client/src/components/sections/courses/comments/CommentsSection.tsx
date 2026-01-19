import { useParams, Link } from "react-router-dom";

import { IEditComment } from "@/common/types";

import {
  useComments,
  useReplyToComment,
  useEditComment,
  useToggleLike,
  useDeleteComment,
} from "@/hooks/queries/useCommentsQueries";

import { CommentsSkeleton } from "@/components/ui/skeletons/CommentsSkeleton";
import { CommentsList } from "./CommentsList";
import { CommentInput } from "./CommentInput";
import { ErrorWrapper } from "@/components/errors/ErrorWpapper";

import commentSvg from "@/assets/comment.svg";

import styles from "./styles/CommentsSection.module.css";

export const CommentsSection = () => {
  const { questionId } = useParams<{ questionId: string }>();

  const { data: comments = [], isLoading, error } = useComments(questionId);
  const replyMutation = useReplyToComment(questionId || "");
  const editMutation = useEditComment(questionId || "");
  const toggleLikeMutation = useToggleLike(questionId || "");
  const deleteMutation = useDeleteComment(questionId || "");

  const totalCount = comments.length;

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const handleReply = async (
    parentId: string,
    text: string,
    images: File[],
  ) => {
    await replyMutation.mutateAsync({
      commentId: parentId,
      data: { text, images },
    });
  };

  const handleLike = async (id: string) => {
    await toggleLikeMutation.mutateAsync(id);
  };

  const handleEdit = async (id: string, text: string, images?: File[]) => {
    const editData: IEditComment = { text };

    if (images !== undefined) {
      editData.images = images;
    }

    await editMutation.mutateAsync({
      commentId: id,
      data: editData,
    });
  };

  const getCommentsLabel = (count: number) => {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) return "коментар";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
      return "коментарі";
    return "коментарів";
  };

  if (isLoading) {
    return <CommentsSkeleton />;
  }

  if (error) {
    return <ErrorWrapper error={error.message || "Помилка завантаження"} />;
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
            <Link to="/community-rules">
              Прочитайте це, перш ніж коментувати
            </Link>
          </div>
        </header>

        <div className={styles.meta}>
          <span>
            {totalCount} {getCommentsLabel(totalCount)}
          </span>
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
          isReplySubmitting={replyMutation.isPending}
          isEditSubmitting={editMutation.isPending}
        />
      </div>
    </section>
  );
};
