import { LikeButton } from "@/components/ui/buttons/LikeButton";

import styles from "./styles/CommentActions.module.css";

interface ICommentActionsProps {
  hasReplies: boolean;
  repliesCount: number;
  areRepliesVisible: boolean;
  likesCount: number;
  isLiked: boolean;
  isOwn?: boolean;
  onToggleReplies: () => void;
  onReply: () => void;
  onLike: () => void;
}

export const CommentActions = ({
  hasReplies,
  repliesCount,
  areRepliesVisible,
  likesCount,
  isLiked,
  onToggleReplies,
  onReply,
  onLike,
  isOwn,
}: ICommentActionsProps) => {
  return (
    <div className={styles.downRow}>
      {hasReplies && (
        <button className={styles.toggleRepliesBtn} onClick={onToggleReplies}>
          {areRepliesVisible ? "Сховати" : `Відповіді (${repliesCount})`}
        </button>
      )}

      {!isOwn && (
        <button className={styles.reply} onClick={onReply}>
          Відповісти
        </button>
      )}

      <LikeButton onToggle={onLike} likesCount={likesCount} isLiked={isLiked} />
    </div>
  );
};
