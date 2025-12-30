import { ModalWrapper } from "./ModalWrapper";

import { useModalsStore } from "@/store/modal/useModalsStore";
import { useAuthStore } from "@/store/auth/useAuthStore";

import DefaultAvatar from "@/assets/avatar-default.svg";

import styles from "./styles/ProfileModal.module.css";

export const ProfileModal = () => {
  const { isProfileModalOpen, closeProfileModal } = useModalsStore();
  const { user, logout } = useAuthStore();

  const isDefaultAvatar = !user?.avatar;

  const handleLogout = () => {
    closeProfileModal();

    setTimeout(() => {
      logout();
    }, 300);
  };

  return (
    <ModalWrapper
      title="Профіль"
      widthRem={35}
      isOpen={isProfileModalOpen}
      onClose={closeProfileModal}
    >
      <div className={styles.profileContent}>
        <div className={styles.infoWrapper}>
          <div className={styles.imgWrapper}>
            <img
              src={user?.avatar || DefaultAvatar}
              alt="Avatar"
              className={
                isDefaultAvatar
                  ? styles.profileAvatarImg
                  : styles.profileAvatarImgUser
              }
            />
          </div>

          <div className={styles.textBlock}>
            <span className={styles.labels}>Ім&apos;я користувача:</span>
            <span className={styles.info}>{user?.name}</span>
            <span className={styles.labels}>Ідентифікатор:</span>
            <span className={styles.info}>{user?.id}</span>
          </div>
        </div>

        <div className={styles.buttonsWrapper}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Вийти з акаунта
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
