import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useModalsStore } from "@/store/modal/useModalsStore";
import { useUserStore } from "@/store/users/useUserStore";

import { ModalWrapper } from "./ModalWrapper";
import { Socials } from "@/components/profile/Socials";

import defaultAvatarSvg from "@/assets/avatar-default.svg";

import styles from "./styles/PublicProfileModal.module.css";

export const PublicProfileModal = () => {
  const { isPublicProfileModalOpen, closePublicProfileModal, publicUserId } =
    useModalsStore();
  const { isLoading, fetchPublicUser, publicUser } = useUserStore();

  const isDefaultAvatar = !publicUser?.avatar;

  useEffect(() => {
    if (publicUserId) {
      fetchPublicUser(publicUserId);
    }
  }, [publicUserId, fetchPublicUser]);

  const handleClose = () => {
    closePublicProfileModal();
  };

  return (
    <ModalWrapper
      title="Профіль"
      widthRem={35}
      isOpen={isPublicProfileModalOpen}
      onClose={handleClose}
    >
      {isLoading ? (
        <div className={styles.profileContent}>
          <div className={styles.infoWrapper}>
            <div className={styles.imgWrapper}>
              <Skeleton circle width={96} height={96} />
            </div>

            <div className={styles.textBlock}>
              <span className={styles.labels}>Ім&apos;я користувача:</span>
              <span className={styles.info}>
                <Skeleton width={120} />
              </span>

              <span className={styles.labels}>Ідентифікатор:</span>
              <span className={styles.info}>
                <Skeleton width={80} />
              </span>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <Skeleton
              count={3}
              height={20}
              style={{ marginBottom: "0.5rem" }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.profileContent}>
          <div className={styles.infoWrapper}>
            <div className={styles.imgWrapper}>
              <img
                src={publicUser?.avatar || defaultAvatarSvg}
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
              <span className={styles.info}>{publicUser?.name}</span>

              <span className={styles.labels}>Ідентифікатор:</span>
              <span className={styles.info}>{publicUser?.id}</span>
            </div>
          </div>

          <Socials socials={publicUser?.socials} />
        </div>
      )}
    </ModalWrapper>
  );
};
