import { useState } from "react";

import { ICommentData } from "@/common/types";

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
  currentUserId: string;
  activeReplyId: string | null;
  level?: number;
  onDelete: (id: string) => void;
  onReply: (parentId: string, text: string, images: File[]) => void;
  onEdit: (id: string, text: string, images: File[]) => void;
  onLike: (id: string) => void;
  onSetActiveReply: (id: string | null) => void;
}

export const CommentItem = ({
  comment,
  currentUserId,
  onDelete,
  onReply,
  onEdit,
  onLike,
  activeReplyId,
  onSetActiveReply,
  level = 1,
}: ICommentItemProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [flatEditingIds, setFlatEditingIds] = useState<Set<string>>(new Set());

  const formattedDate = formatDateTime(comment.createdAt);
  const formattedEditedDate = formatDateTime(comment.editedAt);

  const isDeleted = Boolean(comment.deletedAt);
  const isEdited = Boolean(comment.editedAt);
  const isOwn = currentUserId.toString() === comment.userId;
  const hasReplies = comment.replies && comment.replies.length > 0;
  const showReplyInput = activeReplyId === comment.id;

  const handleReplyClick = () => {
    onSetActiveReply(showReplyInput ? null : comment.id);
  };

  const handleReplySubmit = (text: string, images: File[]) => {
    onReply(comment.id, text, images);
    onSetActiveReply(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    onSetActiveReply(null);
  };

  const handleEditSubmit = (text: string, images: File[]) => {
    onEdit(comment.id, text, images);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(comment.id);
  };

  const renderNestedReplies = () => {
    if (!comment.replies || comment.replies.length === 0) return null;

    return comment.replies.map((reply) => (
      <div key={reply.id} className={styles.replyWrapper}>
        <div className={styles.connectorLine} />
        <CommentItem
          comment={reply}
          currentUserId={currentUserId}
          onDelete={onDelete}
          onReply={onReply}
          onEdit={onEdit}
          onLike={onLike}
          activeReplyId={activeReplyId}
          onSetActiveReply={onSetActiveReply}
          level={level + 1}
        />
      </div>
    ));
  };

  const renderFlatReplies = () => {
    if (!comment.replies || comment.replies.length === 0) return null;

    return (
      <div>
        {comment.replies.map((reply) => (
          <FlatReplyItem
            key={reply.id}
            reply={reply}
            currentUserId={currentUserId}
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
    <div className={styles.commentWrapper}>
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
                  {isOwn && <EditButton onClick={handleEditClick} />}
                  <CloseButton onClick={() => onDelete(comment.id)} />
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
                isLiked={isLiked}
                onToggleReplies={() => setAreRepliesVisible(!areRepliesVisible)}
                onReply={handleReplyClick}
                onLike={handleLike}
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
