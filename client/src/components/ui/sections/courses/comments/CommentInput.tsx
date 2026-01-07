import { useAuthStore } from "@/store/auth/useAuthStore";

import { CommentTextarea } from "./CommentTextarea";

import defaultAvatarSvg from "@/assets/avatar-default.svg";

import styles from "./styles/CommentInput.module.css";

export const CommentInput = () => {
  const { user } = useAuthStore();

  const isDefaultAvatar = !user?.avatar;

  const handleSubmit = (text: string, images: File[]) => {
    console.log("Submit comment:", { text, images });
  };

  return (
    <>
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
        />
      </div>
    </>
  );
};
