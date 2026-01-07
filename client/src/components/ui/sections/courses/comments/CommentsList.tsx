import { useState } from "react";

import { ICommentData } from "@/common/types";

import { CommentItem } from "./CommentItem";

import styles from "./styles/CommentsList.module.css";

interface ICommentsListProps {
  comments: ICommentData[];
  currentUserId: string;
  level?: number;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onReply: (parentId: string, text: string, images: File[]) => void;
  onLike: (id: string) => void;
}

export const CommentsList = ({
  comments,
  currentUserId,
  onDelete,
  onReply,
  onLike,
  onEdit,
  level = 1,
}: ICommentsListProps) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  return (
    <div className={styles.commentsList}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onDelete={onDelete}
          onReply={onReply}
          onLike={onLike}
          onEdit={onEdit}
          activeReplyId={activeReplyId}
          onSetActiveReply={setActiveReplyId}
          level={level}
        />
      ))}
    </div>
  );
};
