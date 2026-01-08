import { Link } from "react-router-dom";

import { ModalWrapper } from "./ModalWrapper";

import { useModalsStore } from "@/store/modal/useModalsStore";
import { useAuthStore } from "@/store/auth/useAuthStore";

import GoogleLogoPng from "@/assets/google-logo.png";

import styles from "./styles/AuthModal.module.css";

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal } = useModalsStore();
  const { login, isLoading } = useAuthStore();

  const handleGoogleLogin = () => {
    login();
  };

  return (
    <ModalWrapper
      title="Увійти"
      widthRem={30}
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
    >
      <button
        className={`${styles.authBtn} ${isLoading ? styles.active : ""}`}
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <img
          src={GoogleLogoPng}
          alt="Google logo"
          className={styles.authBtnImg}
        />
        <span className={styles.authBtnText}>Увійти через Google</span>
      </button>

      <span className={styles.termsOfuse}>
        При натисканні на кнопку ви погоджуєтесь з умовами
        <Link
          to="/terms-of-use"
          state={{ fromAuthModal: true }}
          className={styles.termsLink}
          onClick={closeAuthModal}
        >
          користувацької угоди
        </Link>
      </span>
    </ModalWrapper>
  );
};
