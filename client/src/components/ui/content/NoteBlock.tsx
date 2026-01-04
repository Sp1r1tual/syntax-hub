import infoSvg from "@/assets/info.svg";

import styles from "./styles/NoteBlock.module.css";

interface INoteBlockProps {
  id: string;
  content: string;
}

export const NoteBlock = ({ id, content }: INoteBlockProps) => {
  return (
    <div key={id} className={styles.noteBlock}>
      <img src={infoSvg} alt="info" className={styles.infoImg} />

      <div className={styles.noteContent}>{content}</div>
    </div>
  );
};
