import heartSvg from "@/assets/heart.svg";
import heartFilledSvg from "@/assets/heart-filled.svg";

import styles from "./styles/LikeButton.module.css";

interface ILikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  onToggle: () => void;
}

export const LikeButton = ({
  isLiked,
  likesCount,
  onToggle,
}: ILikeButtonProps) => {
  return (
    <button className={styles.favoriteBtn} onClick={onToggle} type="button">
      <img
        className={isLiked ? styles.heartFilled : ""}
        src={isLiked ? heartFilledSvg : heartSvg}
        alt={isLiked ? "Remove like" : "Like"}
      />
      <span className={styles.likesCount}>{likesCount}</span>
    </button>
  );
};
