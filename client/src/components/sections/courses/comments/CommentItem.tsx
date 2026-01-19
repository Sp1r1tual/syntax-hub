import { useState } from "react";

import { ICommentData } from "@/common/types";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useModalsStore } from "@/store/modal/useModalsStore";

import { CloseButton } from "@/components/ui/buttons/CloseButton";
import { EditButton } from "@/components/ui/buttons/EditButton";
import { CommentTextarea } from "./CommentTextarea";
import { CommentHeader } from "./CommentHeader";
import { CommentContent } from "./CommentContent";
import { CommentActions } from "./CommentActions";
import { FlatReplyItem } from "./FlatReplyItem";

import { formatDateTime } from "@/common/utils/formatDateTime";

import defaultAvatarSvg from "@/assets/avatar-default.svg";

import styles from "./styles/CommentItem.module.css";

interface ICommentItemProps {
  comment: ICommentData;
  activeReplyId: string | null;
  level?: number;
  isReplySubmitting?: boolean;
  isEditSubmitting?: boolean;
  onDelete: (id: string) => void;
  onReply: (parentId: string, text: string, images: File[]) => void;
  onEdit: (id: string, text: string, images?: File[]) => void;
  onLike: (id: string) => void;
  onSetActiveReply: (id: string | null) => void;
}

export const CommentItem = ({
  comment,
  onDelete,
  onReply,
  onEdit,
  onLike,
  activeReplyId,
  onSetActiveReply,
  isReplySubmitting = false,
  isEditSubmitting = false,
  level = 1,
}: ICommentItemProps) => {
  const currentUserId = useAuthStore((state) => state.user?.id);
  const { user } = useAuthStore();
  const { openAuthModal, openConfirmModal } = useModalsStore();

  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [flatEditingIds, setFlatEditingIds] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedDate = formatDateTime(comment.createdAt);
  const formattedEditedDate = formatDateTime(comment.editedAt);

  const isDeleted = Boolean(comment.deletedAt);
  const isEdited = Boolean(comment.editedAt);
  const isOwn = currentUserId === comment.userId;
  const hasReplies = comment.replies && comment.replies.length > 0;
  const showReplyInput = activeReplyId === comment.id;

  const handleReplyClick = () => {
    if (!user) {
      openAuthModal();
      return;
    }

    onSetActiveReply(showReplyInput ? null : comment.id);
  };

  const handleReplySubmit = (text: string, images: File[]) => {
    onReply(comment.id, text, images);
    onSetActiveReply(null);

    setAreRepliesVisible(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    onSetActiveReply(null);
  };

  const handleEditSubmit = (text: string, images?: File[]) => {
    onEdit(comment.id, text, images);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleLike = () => {
    if (!user) {
      openAuthModal();
      return;
    }

    onLike(comment.id);
  };

  const handleDelete = () => {
    openConfirmModal("Видалити коментар?", () => {
      setIsDeleting(true);

      setTimeout(() => {
        onDelete(comment.id);
      }, 250);
    });
  };

  const renderNestedReplies = () => {
    if (!comment.replies || comment.replies.length === 0) return null;

    return comment.replies.map((reply) => (
      <div key={reply.id} className={styles.replyWrapper}>
        <div className={styles.connectorLine} />
        <CommentItem
          comment={reply}
          onDelete={onDelete}
          onReply={onReply}
          onEdit={onEdit}
          onLike={onLike}
          activeReplyId={activeReplyId}
          onSetActiveReply={onSetActiveReply}
          isReplySubmitting={isReplySubmitting}
          isEditSubmitting={isEditSubmitting}
          level={level + 1}
        />
      </div>
    ));
  };

  const renderFlatReplies = () => {
    if (!comment.replies || comment.replies.length === 0) return null;

    const flattenReplies = (replies: ICommentData[]): ICommentData[] => {
      const result: ICommentData[] = [];

      const flatten = (replyList: ICommentData[]) => {
        replyList.forEach((reply) => {
          result.push(reply);
          if (reply.replies && reply.replies.length > 0) {
            flatten(reply.replies);
          }
        });
      };

      flatten(replies);
      return result;
    };

    const allReplies = flattenReplies(comment.replies);

    return (
      <div>
        {allReplies.map((reply) => (
          <FlatReplyItem
            key={reply.id}
            reply={reply}
            isEditing={flatEditingIds.has(reply.id)}
            isReplyActive={activeReplyId === reply.id}
            onDelete={onDelete}
            onReply={(text, images) => {
              onReply(reply.id, text, images);
              onSetActiveReply(null);
            }}
            onEdit={(text, images) => {
              onEdit(reply.id, text, images);
              setFlatEditingIds((prev) => {
                const next = new Set(prev);
                next.delete(reply.id);
                return next;
              });
            }}
            onLike={onLike}
            onReplyClick={() => {
              onSetActiveReply(activeReplyId === reply.id ? null : reply.id);
            }}
            onEditClick={() => {
              setFlatEditingIds((prev) => new Set(prev).add(reply.id));
              onSetActiveReply(null);
            }}
            onEditCancel={() => {
              setFlatEditingIds((prev) => {
                const next = new Set(prev);
                next.delete(reply.id);
                return next;
              });
            }}
          />
        ))}
      </div>
    );
  };

  const renderReplies = () => {
    if (level < 3) {
      return renderNestedReplies();
    }
    return renderFlatReplies();
  };

  return (
    <div
      className={`${styles.commentWrapper} ${
        isDeleting ? styles.deleting : ""
      }`}
    >
      <div className={styles.commentContainer}>
        <img
          src={comment.avatar || defaultAvatarSvg}
          className={styles.profileAvatarImg}
          alt={comment.username}
        />

        <div className={styles.body}>
          <div
            className={`${styles.viewMode} ${
              isEditing ? styles.hidden : styles.visible
            }`}
          >
            <div className={styles.commentBody}>
              {!isDeleted && isOwn && (
                <div className={styles.deleteWrapper}>
                  <EditButton onClick={handleEditClick} />
                  <CloseButton onClick={handleDelete} />
                </div>
              )}

              <CommentHeader
                username={comment.username}
                formattedDate={formattedDate}
                isEdited={isEdited}
                formattedEditedDate={formattedEditedDate}
              />

              <CommentContent
                text={comment.text}
                images={comment.images}
                isDeleted={isDeleted}
              />
            </div>

            {!isDeleted && (
              <CommentActions
                hasReplies={hasReplies}
                repliesCount={comment.replies?.length || 0}
                areRepliesVisible={areRepliesVisible}
                likesCount={comment.likes}
                isLiked={comment.liked}
                onToggleReplies={() => setAreRepliesVisible(!areRepliesVisible)}
                onReply={handleReplyClick}
                onLike={handleLike}
                isOwn={isOwn}
              />
            )}

            {showReplyInput && (
              <div className={styles.replyInputWrapper}>
                <CommentTextarea
                  placeholder="Напишіть відповідь..."
                  submitText="Відповісти"
                  onSubmit={handleReplySubmit}
                  onCancel={() => onSetActiveReply(null)}
                  isReply
                  initialText={`${comment.username}, `}
                  isSubmitting={isReplySubmitting}
                />
              </div>
            )}
          </div>

          <div
            className={`${styles.editMode} ${
              isEditing ? styles.visible : styles.hidden
            }`}
          >
            <CommentTextarea
              placeholder="Редагувати коментар..."
              submitText="Зберегти"
              onSubmit={handleEditSubmit}
              onCancel={handleEditCancel}
              isReply
              initialText={comment.text}
              initialImages={comment.images}
              isSubmitting={isEditSubmitting}
            />
          </div>
        </div>
      </div>

      {hasReplies && areRepliesVisible && (
        <div className={styles.repliesContainer}>
          <div className={styles.threadLine} />
          {renderReplies()}
        </div>
      )}
    </div>
  );
};
