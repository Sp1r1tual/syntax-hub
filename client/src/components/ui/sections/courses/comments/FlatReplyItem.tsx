import { ICommentData } from "@/common/types";

import { CloseButton } from "@/components/ui/buttons/CloseButton";
import { EditButton } from "@/components/ui/buttons/EditButton";
import { CommentTextarea } from "./CommentTextarea";
import { CommentHeader } from "./CommentHeader";
import { CommentContent } from "./CommentContent";
import { CommentActions } from "./CommentActions";

import defaultAvatarSvg from "@/assets/avatar-default.svg";

import styles from "./styles/FlatReplyItem.module.css";

interface IFlatReplyItemProps {
  reply: ICommentData;
  currentUserId: string;
  isEditing: boolean;
  isReplyActive: boolean;
  onDelete: (id: string) => void;
  onReply: (text: string, images: File[]) => void;
  onEdit: (text: string, images: File[]) => void;
  onLike: (id: string) => void;
  onReplyClick: () => void;
  onEditClick: () => void;
  onEditCancel: () => void;
}

export const FlatReplyItem = ({
  reply,
  currentUserId,
  isEditing,
  isReplyActive,
  onDelete,
  onReply,
  onEdit,
  onLike,
  onReplyClick,
  onEditClick,
  onEditCancel,
}: IFlatReplyItemProps) => {
  const isDeleted = Boolean(reply.deletedAt);
  const isEdited = Boolean(reply.editedAt);
  const isOwn = currentUserId.toString() === reply.userId;

  const formattedDate = new Date(reply.createdAt).toLocaleString("uk-UA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEditedDate = reply.editedAt
    ? new Date(reply.editedAt).toLocaleString("uk-UA", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.commentContainer}>
        <img
          src={reply.avatar || defaultAvatarSvg}
          className={styles.profileAvatarImg}
          alt={reply.username}
        />

        <div className={styles.body}>
          {isEditing ? (
            <CommentTextarea
              placeholder="Редагувати коментар..."
              submitText="Зберегти"
              onSubmit={onEdit}
              onCancel={onEditCancel}
              isReply={true}
              initialText={reply.text}
              initialImages={reply.images}
            />
          ) : (
            <>
              <div className={styles.commentBody}>
                {!isDeleted && isOwn && (
                  <div className={styles.deleteWrapper}>
                    {isOwn && <EditButton onClick={onEditClick} />}
                    <CloseButton onClick={() => onDelete(reply.id)} />
                  </div>
                )}

                <CommentHeader
                  username={reply.username}
                  formattedDate={formattedDate}
                  isEdited={isEdited}
                  formattedEditedDate={formattedEditedDate}
                />

                <CommentContent
                  text={reply.text}
                  images={reply.images}
                  isDeleted={isDeleted}
                />
              </div>

              {!isDeleted && (
                <CommentActions
                  hasReplies={false}
                  repliesCount={0}
                  areRepliesVisible={false}
                  likesCount={reply.likes}
                  isLiked={false}
                  onToggleReplies={() => {}}
                  onReply={onReplyClick}
                  onLike={() => onLike(reply.id)}
                />
              )}

              {isReplyActive && (
                <div className={styles.replyInputWrapper}>
                  <CommentTextarea
                    placeholder="Напишіть відповідь..."
                    submitText="Відповісти"
                    onSubmit={onReply}
                    onCancel={onReplyClick}
                    isReply={true}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
