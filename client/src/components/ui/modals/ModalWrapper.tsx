import { ReactNode, useEffect, useState } from "react";

import { CloseButton } from "../buttons/CloseButton";

import styles from "./styles/ModalWrapper.module.css";

interface IModalWrapperProps {
  isOpen: boolean;
  children: ReactNode;
  title?: string;
  widthRem?: number;
  onClose: () => void;
}

export const ModalWrapper = ({
  isOpen,
  onClose,
  title,
  widthRem,
  children,
}: IModalWrapperProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      const renderTimer = setTimeout(() => setShouldRender(true), 0);
      const showTimer = setTimeout(() => setIsVisible(true), 10);

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      return () => {
        clearTimeout(renderTimer);
        clearTimeout(showTimer);
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    } else {
      const hideTimer = setTimeout(() => setIsVisible(false), 0);
      const removeTimer = setTimeout(() => setShouldRender(false), 300);

      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={`${styles.overlay} ${isVisible ? styles.visible : ""}`}
        onClick={onClose}
        role="button"
      />
      <div
        className={`${styles.modal} ${isVisible ? styles.visible : ""}`}
        style={{ maxWidth: widthRem ? `${widthRem}rem` : undefined }}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.leftSpacer} />

            {title && <h2 className={styles.modalTitle}>{title}</h2>}

            <CloseButton onClick={onClose} />
          </div>
          <div className={styles.modalBody}>{children}</div>
        </div>
      </div>
    </>
  );
};
