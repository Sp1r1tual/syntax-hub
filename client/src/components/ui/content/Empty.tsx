import styles from "./styles/Empty.module.css";

interface EmptyProps {
  title: string;
  description: string;
}

export const Empty = ({ title, description }: EmptyProps) => {
  return (
    <div className={styles.emptyWrapper}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};
