import closeCircleSvg from "@/assets/close.svg";

import styles from "./styles/CloseButton.module.css";

interface ICloseBtnProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const CloseButton = ({ onClick, isLoading }: ICloseBtnProps) => {
  return (
    <button className={styles.closeBtn} disabled={isLoading} onClick={onClick}>
      <img src={closeCircleSvg} className={styles.icon} />
    </button>
  );
};
