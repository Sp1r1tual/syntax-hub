import { useModalsStore } from "@/store/modal/useModalsStore";
import { useAuthStore } from "@/store/auth/useAuthStore";

import styles from "./styles/CommentHeader.module.css";

interface ICommentHeaderProps {
  userId: string;
  username: string;
  formattedDate: string | null;
  isEdited: boolean;
  formattedEditedDate: string | null;
}

export const CommentHeader = ({
  userId,
  username,
  formattedDate,
  isEdited,
  formattedEditedDate,
}: ICommentHeaderProps) => {
  const { openPublicProfileModal, openAuthModal } = useModalsStore();
  const { user } = useAuthStore();

  const displayDate =
    isEdited && formattedEditedDate ? formattedEditedDate : formattedDate;

  const openPublicProfile = () => {
    if (!user) {
      openAuthModal();
      return;
    }

    openPublicProfileModal(userId);
  };

  return (
    <div className={styles.commentHeader}>
      <a className={styles.username} onClick={openPublicProfile}>
        {username}
      </a>

      {displayDate && (
        <span className={styles.createdAt}>
          {isEdited ? `змінено: ${displayDate}` : displayDate}
        </span>
      )}
    </div>
  );
};
