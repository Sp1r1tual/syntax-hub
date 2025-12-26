import { ModalWrapper } from "./ModalWrapper";

import { useAuthModalStore } from "@/store/modal/useAuthModalStore";

import GoogleLogoPng from "@/assets/google-logo.png";

import styles from "./styles/AuthModal.module.css";

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuthModalStore();

  return (
    <ModalWrapper
      title="Увійти"
      widthRem={30}
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
    >
      <button className={styles.authBtn}>
        <img
          src={GoogleLogoPng}
          alt="Google logo"
          className={styles.authBtnImg}
        />
        <span className={styles.authBtnText}>Увійти через Google</span>
      </button>

      <span className={styles.termsOfuse}>
        При натисканні на кнопку ви погоджуєтесь з умовами{" "}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.termsLink}
        >
          користувацької угоди
        </a>
      </span>
    </ModalWrapper>
  );
};
