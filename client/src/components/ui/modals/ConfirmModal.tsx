import { useModalsStore } from "@/store/modal/useModalsStore";

import { ModalWrapper } from "./ModalWrapper";
import { CommonButton } from "../buttons/CommonButton";

import styles from "./styles/ConfirmModal.module.css";

export const ConfirmModal = () => {
  const { isConfirmModalOpen, closeConfirmModal, confirmText, onConfirm } =
    useModalsStore();

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeConfirmModal();
  };

  return (
    <ModalWrapper
      title="Підтвердження дії"
      widthRem={30}
      isOpen={isConfirmModalOpen}
      onClose={closeConfirmModal}
    >
      <div className={styles.confirmWrapper}>
        <p>{confirmText}</p>

        <div className={styles.buttonsWrapper}>
          <CommonButton text="Так" onClick={handleConfirm} />
          <CommonButton text="Ні" onClick={closeConfirmModal} />
        </div>
      </div>
    </ModalWrapper>
  );
};
