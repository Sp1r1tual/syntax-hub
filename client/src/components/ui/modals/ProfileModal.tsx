import { useState } from "react";

import { useModalsStore } from "@/store/modal/useModalsStore";
import { useAuthStore } from "@/store/auth/useAuthStore";

import { ModalWrapper } from "./ModalWrapper";
import { EditProfileForm } from "@/components/profile/EditProfileForm";

import DefaultAvatar from "@/assets/avatar-default.svg";

import styles from "./styles/ProfileModal.module.css";

type ProfileModalMode = "view" | "edit";

export const ProfileModal = () => {
  const { isProfileModalOpen, closeProfileModal } = useModalsStore();
  const { user, logout } = useAuthStore();

  const [mode, setMode] = useState<ProfileModalMode>("view");

  const isDefaultAvatar = !user?.avatar;

  const handleClose = () => {
    setMode("view");
    closeProfileModal();
  };

  const handleLogout = () => {
    handleClose();
    setTimeout(() => logout(), 300);
  };

  return (
    <ModalWrapper
      title={mode === "edit" ? "Редагування" : "Профіль"}
      widthRem={35}
      isOpen={isProfileModalOpen}
      onClose={handleClose}
    >
      {mode === "view" && (
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
            <button
              className={styles.editProfileBtn}
              onClick={() => setMode("edit")}
            >
              Редагувати профіль
            </button>

            <button className={styles.logoutBtn} onClick={handleLogout}>
              Вийти з акаунта
            </button>
          </div>
        </div>
      )}

      {mode === "edit" && <EditProfileForm onClose={() => setMode("view")} />}
    </ModalWrapper>
  );
};
