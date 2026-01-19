import { useAuthStore } from "@/store/auth/useAuthStore";
import { useSendComment } from "@/hooks/queries/useCommentsQueries";

import { CommentTextarea } from "./CommentTextarea";

import defaultAvatarSvg from "@/assets/avatar-default.svg";

import styles from "./styles/CommentInput.module.css";

interface ICommentInputProps {
  questionId: string;
}

export const CommentInput = ({ questionId }: ICommentInputProps) => {
  const { user } = useAuthStore();
  const { mutateAsync: sendComment, isPending } = useSendComment(questionId);

  const isDefaultAvatar = !user?.avatar;

  const handleSubmit = async (text: string, images: File[]) => {
    await sendComment({ text, images });
  };

  return (
    <div className={styles.wrapper}>
      <img
        src={user?.avatar || defaultAvatarSvg}
        className={
          isDefaultAvatar
            ? styles.profileAvatarImg
            : styles.profileAvatarImgUser
        }
        alt="Avatar"
      />
      <CommentTextarea
        placeholder="Приєднатися до обговорення..."
        submitText="Коментувати"
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
};
