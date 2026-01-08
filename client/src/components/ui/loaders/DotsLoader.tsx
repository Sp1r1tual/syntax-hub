import styles from "./styles/DotsLoader.module.css";

interface IDotsLoaderProps {
  size?: number;
  gap?: number;
}

export const DotsLoader = ({ size = 0.5, gap = 0.375 }: IDotsLoaderProps) => {
  return (
    <div className={styles.loader} style={{ gap: `${gap}rem` }}>
      <span
        className={styles.dot}
        style={{ width: `${size}rem`, height: `${size}rem` }}
      />
      <span
        className={styles.dot}
        style={{ width: `${size}rem`, height: `${size}rem` }}
      />
      <span
        className={styles.dot}
        style={{ width: `${size}rem`, height: `${size}rem` }}
      />
    </div>
  );
};
