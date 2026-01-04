import { useModalsStore } from "@/store/modal/useModalsStore";
import { useAuthStore } from "@/store/auth/useAuthStore";

import ProfileSvg from "@/assets/profile.svg";

import styles from "./styles/ProfileButton.module.css";

export const ProfileButton = () => {
  const { openProfileModal } = useModalsStore();

  const { user } = useAuthStore();

  const isDefaultAvatar = !user?.avatar;

  return (
    <button className={styles.profileBtn} onClick={openProfileModal}>
      <img
        src={user?.avatar || ProfileSvg}
        alt="Profile"
        className={
          isDefaultAvatar ? styles.profileBtnImg : styles.profileBtnImgUser
        }
      />
    </button>
  );
};
