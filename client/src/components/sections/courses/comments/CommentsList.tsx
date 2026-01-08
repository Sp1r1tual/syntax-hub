import { useState } from "react";

import { ICommentData } from "@/common/types";

import { CommentItem } from "./CommentItem";

import styles from "./styles/CommentsList.module.css";

interface ICommentsListProps {
  comments: ICommentData[];
  level?: number;
  onEdit: (id: string, text: string, images?: File[]) => void;
  onDelete: (id: string) => void;
  onReply: (parentId: string, text: string, images: File[]) => void;
  onLike: (id: string) => void;
}

export const CommentsList = ({
  comments,
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
