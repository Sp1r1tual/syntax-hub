import { IQuestionDetail } from "@/common/types";

import { useModalsStore } from "@/store/modal/useModalsStore";

import { CodeBlock } from "../../content/CodeBlock";
import { ListBlock } from "../../content/ListBlock";
import { ImageBlock } from "../../content/ImageBlock";
import { TextBlock } from "../../content/TextBlock";
import { TableBlock } from "../../content/TableBlock";
import { NoteBlock } from "../../content/NoteBlock";
import { CommonButton } from "@/components/ui/buttons/CommonButton";

import styles from "./styles/QuestionContent.module.css";

interface IQuestionContentProps {
  question: IQuestionDetail;
}

export const QuestionContent = ({ question }: IQuestionContentProps) => {
  const { openMobileTopicsModal } = useModalsStore();

  return (
    <>
      <div className={styles.commonBtnWrapper}>
        <CommonButton text="Показати теми" onClick={openMobileTopicsModal} />
      </div>

      <article className={styles.article}>
        <h1 className={styles.title}>{question.text}</h1>

        <div className={styles.blocks}>
          {question.blocks.map((block) => {
            switch (block.type) {
              case "TEXT":
                return (
                  <TextBlock
                    key={block.id}
                    id={block.id}
                    content={block.content}
                  />
                );

              case "CODE":
                return (
                  <CodeBlock
                    key={block.id}
                    language={block.language}
                    content={block.content}
                  />
                );

              case "NOTE":
                return (
                  <NoteBlock
                    key={block.id}
                    id={block.id}
                    content={block.content}
                  />
                );

              case "IMAGE":
                return (
                  <ImageBlock
                    key={block.id}
                    id={block.id}
                    src={block.src}
                    alt={block.alt}
                    caption={block.caption}
                  />
                );

              case "TABLE":
                return (
                  <TableBlock
                    key={block.id}
                    id={block.id}
                    title={block.title}
                    headers={block.headers ?? []}
                    rows={block.rows ?? []}
                  />
                );

              case "LIST":
                return (
                  <ListBlock
                    key={block.id}
                    id={block.id}
                    items={block.items}
                    title={block.title}
                    ordered={block.ordered}
                  />
                );

              default:
                return null;
            }
          })}
        </div>
      </article>
    </>
  );
};
