import { useState } from "react";

import { ICommentData } from "@/common/types";

import { CommentItem } from "./CommentItem";

interface ICommentsListProps {
  comments: ICommentData[];
  isReplySubmitting?: boolean;
  isEditSubmitting?: boolean;
  onDelete: (id: string) => void;
  onReply: (parentId: string, text: string, images: File[]) => void;
  onEdit: (id: string, text: string, images?: File[]) => void;
  onLike: (id: string) => void;
}

export const CommentsList = ({
  comments,
  onDelete,
  onReply,
  onEdit,
  onLike,
  isReplySubmitting = false,
  isEditSubmitting = false,
}: ICommentsListProps) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          activeReplyId={activeReplyId}
          onDelete={onDelete}
          onReply={onReply}
          onEdit={onEdit}
          onLike={onLike}
          onSetActiveReply={setActiveReplyId}
          isReplySubmitting={isReplySubmitting}
          isEditSubmitting={isEditSubmitting}
        />
      ))}
    </div>
  );
};
