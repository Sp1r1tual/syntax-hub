import styles from "./styles/ListBlock.module.css";

interface IListBlockProps {
  id: string;
  items: string[];
  ordered?: boolean | undefined;
  title?: string | undefined;
}

export const ListBlock = ({ id, items, ordered, title }: IListBlockProps) => {
  if (ordered) {
    return (
      <div className={styles.listBlockWrapper}>
        {title && <span className={styles.listTitle}>{title}</span>}

        <ol className={styles.listBlock}>
          {items.map((item) => (
            <li key={`${id}-${item}`}>{item}</li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className={styles.listBlockWrapper}>
      {title && <span className={styles.listTitle}>{title}</span>}

      <ul className={styles.listBlock}>
        {items.map((item) => (
          <li key={`${id}-${item}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
