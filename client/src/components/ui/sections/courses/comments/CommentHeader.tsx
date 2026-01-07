import styles from "./styles/CommentHeader.module.css";

interface ICommentHeaderProps {
  username: string;
  formattedDate: string | null;
  isEdited: boolean;
  formattedEditedDate: string | null;
}

export const CommentHeader = ({
  username,
  formattedDate,
  isEdited,
  formattedEditedDate,
}: ICommentHeaderProps) => {
  return (
    <div className={styles.commentHeader}>
      <span className={styles.username}>{username}</span>
      <span className={styles.createdAt}>{formattedDate}</span>
      {isEdited && formattedEditedDate && (
        <span className={styles.edited}>(змінено: {formattedEditedDate})</span>
      )}
    </div>
  );
};
