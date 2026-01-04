import styles from "./styles/ImageBlock.module.css";

interface IImageBlockProps {
  id: string;
  src: string;
  caption?: string | undefined;
  alt?: string | undefined;
}

export const ImageBlock = ({ id, src, caption, alt }: IImageBlockProps) => {
  return (
    <div key={id} className={styles.imageBlock}>
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img src={src} alt={alt || ""} />
      </a>

      {caption && <div className={styles.imageCaption}>{caption}</div>}
    </div>
  );
};
