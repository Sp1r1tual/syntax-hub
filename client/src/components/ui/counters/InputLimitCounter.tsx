import styles from "./styles/InputLimitCounter.module.css";

interface IInputLimitCounterProps {
  imagesLength: number;
  textLength: number;
  maxImages?: number;
  maxText?: number;
}

export const InputLimitCounter = ({
  imagesLength,
  textLength,
  maxImages = 2,
  maxText = 1000,
}: IInputLimitCounterProps) => {
  const showImages = imagesLength > 0;
  const showText = textLength > 0;

  if (!showImages && !showText) return null;

  return (
    <div className={styles.limitCounter}>
      {showImages && `зображення ${imagesLength}/${maxImages}`}
      {showImages && showText && " • "}
      {showText && `символи ${textLength}/${maxText}`}
    </div>
  );
};
