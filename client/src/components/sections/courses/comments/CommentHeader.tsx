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
  const displayDate =
    isEdited && formattedEditedDate ? formattedEditedDate : formattedDate;

  return (
    <div className={styles.commentHeader}>
      <span className={styles.username}>{username}</span>
      {displayDate && (
        <span className={styles.createdAt}>
          {isEdited ? `змінено: ${displayDate}` : displayDate}
        </span>
      )}
    </div>
  );
};
