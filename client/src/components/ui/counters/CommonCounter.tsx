import styles from "./styles/CommonCounter.module.css";

interface ICommonCounterProps {
  quantity: number;
}

export const CommonCounter = ({ quantity }: ICommonCounterProps) => {
  return (
    <>{quantity > 0 && <span className={styles.imageCount}>{quantity}</span>}</>
  );
};
