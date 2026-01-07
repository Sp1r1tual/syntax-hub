import { IImage } from "@/common/types";

import styles from "./styles/CommentContent.module.css";

interface ICommentContentProps {
  text: string;
  images: IImage[];
  isDeleted: boolean;
}

export const CommentContent = ({
  text,
  images,
  isDeleted,
}: ICommentContentProps) => {
  return (
    <div className={styles.commentContent}>
      {isDeleted ? (
        <div className={styles.deletedText}>Коментар видалено</div>
      ) : (
        <>
          <div className={styles.commentText}>{text}</div>

          {images.length > 0 && (
            <div className={styles.commentImg}>
              {images.map((img) => (
                <a key={img.id} href={img.src} target="_blank" rel="noreferrer">
                  <img src={img.src} />
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
