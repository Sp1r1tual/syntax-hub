import { useCommentInput } from "@/hooks/useCommentInput";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useModalsStore } from "@/store/modal/useModalsStore";

import { CloseButton } from "@/components/ui/buttons/CloseButton";
import { CommonCounter } from "@/components/ui/counters/CommonCounter";
import { InputLimitCounter } from "@/components/ui/counters/InputLimitCounter";

import defaultAvatarSvg from "@/assets/avatar-default.svg";
import codeSvg from "@/assets/code-toolbar.svg";
import imageSvg from "@/assets/image-toolbar.svg";

import styles from "./styles/CommentInput.module.css";

export const CommentInput = () => {
  const { user } = useAuthStore();
  const { openAuthModal } = useModalsStore();

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
  } = useCommentInput();

  const isDefaultAvatar = !user?.avatar;

  const handleSubmit = () => {
    if (!user) {
      openAuthModal();
      return;
    }

    resetInput();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <img
          src={user?.avatar || defaultAvatarSvg}
          className={
            isDefaultAvatar
              ? styles.profileAvatarImg
              : styles.profileAvatarImgUser
          }
          alt="Avatar"
        />
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
              ref={textareaRef}
              className={styles.input}
              placeholder="Приєднатися до обговорення..."
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

            <button
              className={styles.submit}
              onClick={handleSubmit}
              disabled={!text.trim() && images.length === 0}
            >
              Коментувати
            </button>
          </div>
        </div>
      </div>

      <InputLimitCounter
        imagesLength={images.length}
        textLength={text.length}
      />
    </>
  );
};
