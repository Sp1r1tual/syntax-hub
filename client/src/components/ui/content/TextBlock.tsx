import styles from "./styles/TextBlock.module.css";

interface ITextBlockProps {
  id: string;
  content: string;
}

export const TextBlock = ({ id, content }: ITextBlockProps) => {
  return (
    <p key={id} className={styles.textBlock}>
      {content}
    </p>
  );
};
