import { useState } from "react";

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
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (imageId: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageId));
  };

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
                  <div className={styles.imageWrapper}>
                    {!loadedImages.has(img.id) && (
                      <div className={styles.imageSkeleton} />
                    )}
                    <img
                      src={img.src}
                      onLoad={() => handleImageLoad(img.id)}
                      className={loadedImages.has(img.id) ? styles.loaded : ""}
                    />
                  </div>
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
