import { useModalsStore } from "@/store/modal/useModalsStore";

import GoogleLogoPng from "@/assets/google-logo.png";

import styles from "./styles/GoogleAuthButton.module.css";

export const GoogleAuthButton = () => {
  const { openAuthModal } = useModalsStore();

  return (
    <button className={styles.authBtn} onClick={openAuthModal}>
      <>
        <img
          src={GoogleLogoPng}
          alt="Google logo"
          className={styles.authBtnImg}
        />
        <span className={styles.authBtnText}>Увійти</span>
      </>
    </button>
  );
};
