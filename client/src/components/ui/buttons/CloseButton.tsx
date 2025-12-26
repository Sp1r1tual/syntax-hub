import closeCircleSvg from "@/assets/close.svg";

import styles from "./styles/CloseBtn.module.css";

type CloseBtnProps = {
  onClick: () => void;
  isLoading?: boolean;
};

export const CloseButton = ({ onClick, isLoading }: CloseBtnProps) => {
  return (
    <button className={styles.closeBtn} disabled={isLoading} onClick={onClick}>
      <img src={closeCircleSvg} className={styles.icon} />
    </button>
  );
};
