import { useEffect, useId } from "react";
import { useCommentInput } from "@/hooks/useCommentInput";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useModalsStore } from "@/store/modal/useModalsStore";

import { CloseButton } from "@/components/ui/buttons/CloseButton";
import { CommonCounter } from "@/components/ui/counters/CommonCounter";
import { InputLimitCounter } from "@/components/ui/counters/InputLimitCounter";

import codeSvg from "@/assets/code-toolbar.svg";
import imageSvg from "@/assets/image-toolbar.svg";

import styles from "./styles/CommentTextarea.module.css";

interface ICommentTextareaProps {
  placeholder?: string;
  submitText?: string;
  isReply?: boolean;
  initialText?: string;
  initialImages?: { id: string; order: number; src: string }[];
  isSubmitting?: boolean;
  onSubmit?: (text: string, images: File[]) => void;
  onCancel?: () => void;
}

export const CommentTextarea = ({
  placeholder = "Приєднатися до обговорення...",
  submitText = "Коментувати",
  onSubmit,
  onCancel,
  isReply = false,
  initialText = "",
  initialImages = [],
  isSubmitting = false,
}: ICommentTextareaProps) => {
  const generatedId = useId();

  const {
    text,
    setText,
    autoResizeTextarea,
    images,
    isDragging,
    textareaRef,
    fileInputRef,
    removeImage,
    handleImageClick,
    handleFileChange,
    handlePaste,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleCodeClick,
    resetInput,
    setInitialImages,
  } = useCommentInput();

  const { user } = useAuthStore();
  const { openAuthModal } = useModalsStore();

  useEffect(() => {
    if (initialText) {
      setText(initialText);
      setTimeout(() => {
        autoResizeTextarea();
      }, 0);
    }

    if (initialImages && initialImages.length > 0) {
      const imagePromises = initialImages.map(async (img) => {
        try {
          const response = await fetch(img.src);
          const blob = await response.blob();
          const file = new File([blob], `image-${img.id}.jpg`, {
            type: blob.type,
          });

          return {
            id: img.id,
            file,
            preview: img.src,
            name: `image-${img.id}.jpg`,
          };
        } catch (error) {
          console.error("Failed to load image:", error);
          return null;
        }
      });

      Promise.all(imagePromises).then((loadedImages) => {
        const validImages = loadedImages.filter((img) => img !== null);
        if (validImages.length > 0) {
          setInitialImages(validImages);
        }
      });
    }
  }, [
    initialText,
    initialImages,
    setText,
    autoResizeTextarea,
    setInitialImages,
  ]);

  const handleSubmit = () => {
    if (!user) {
      openAuthModal();
      return;
    }

    if (onSubmit) {
      const files = images.map((img) => img.file);
      onSubmit(text, files);
    }

    resetInput();
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.container} ${isDragging ? styles.dragging : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className={styles.dragOverlay}>
            <div className={styles.dragMessage}>
              <span>Відпустіть для завантаження</span>
            </div>
          </div>
        )}

        {images.length > 0 && (
          <div className={styles.imagesPreview}>
            {images.map((img) => (
              <div key={img.id} className={styles.imagePreviewItem}>
                <img src={img.preview} alt={img.name} />

                <CloseButton onClick={() => removeImage(img.id)} />

                <div className={styles.imageName}>{img.name}</div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.textareaWrapper}>
          <textarea
            id={generatedId}
            ref={textareaRef}
            className={styles.input}
            placeholder={placeholder}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              autoResizeTextarea();
            }}
            onPaste={handlePaste}
          />
        </div>

        <div className={styles.toolbar}>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.toolbarBtn}
              onClick={handleImageClick}
              disabled={images.length >= 2}
            >
              <img src={imageSvg} alt="img" />
              <div>
                <CommonCounter quantity={images.length} />
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className={styles.fileInput}
            />

            <button
              type="button"
              className={styles.toolbarBtn}
              onClick={handleCodeClick}
            >
              <img src={codeSvg} alt="</>" />
            </button>
          </div>

          <div className={styles.submitButtons}>
            <button
              className={`${styles.submit} ${isSubmitting ? styles.active : ""}`}
              onClick={handleSubmit}
              disabled={isSubmitting || (!text.trim() && images.length === 0)}
            >
              {submitText}
            </button>

            {isReply && onCancel && (
              <button className={styles.cancel} onClick={onCancel}>
                Скасувати
              </button>
            )}
          </div>
        </div>
      </div>

      <InputLimitCounter
        imagesLength={images.length}
        textLength={text.length}
      />
    </div>
  );
};
