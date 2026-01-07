import editSvg from "@/assets/edit.svg";

import styles from "./styles/EditButton.module.css";

interface IEditButtonProps {
  onClick: () => void;
}

export const EditButton = ({ onClick }: IEditButtonProps) => {
  return (
    <button className={styles.editButton} onClick={onClick}>
      <img src={editSvg} className={styles.icon} alt="Edit" />
    </button>
  );
};
