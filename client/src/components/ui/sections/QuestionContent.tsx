import { IQuestionDetail } from "@/common/types";

import { useModalsStore } from "@/store/modal/useModalsStore";

import { CodeBlock } from "./CodeBlock";
import { CommonButton } from "@/components/ui/buttons/CommonButton";

import infoSvg from "@/assets/info.svg";

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
            const id = block.id;
            switch (block.type) {
              case "TEXT":
                return (
                  <p key={id} className={styles.textBlock}>
                    {block.content}
                  </p>
                );

              case "CODE":
                return (
                  <CodeBlock
                    key={id}
                    language={block.language}
                    content={block.content}
                  />
                );

              case "NOTE":
                return (
                  <div key={id} className={styles.noteBlock}>
                    <img src={infoSvg} alt="info" className={styles.infoImg} />

                    <div className={styles.noteContent}>{block.content}</div>
                  </div>
                );

              case "IMAGE":
                return (
                  <div key={id} className={styles.imageBlock}>
                    <a
                      href={block.src}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={block.src}
                        alt={block.alt || ""}
                        className={styles.image}
                      />
                    </a>

                    {block.caption && (
                      <div className={styles.caption}>{block.caption}</div>
                    )}
                  </div>
                );

              case "TABLE":
                return (
                  <div key={id}>
                    {block.title && (
                      <div className={styles.tableTitle}>{block.title}</div>
                    )}
                    <div className={styles.tableWrapper}>
                      <table className={styles.tableBlock}>
                        <thead>
                          <tr>
                            {block.headers.map((header) => (
                              <th key={header.id}>{header.text}</th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {block.rows.map((row) => (
                            <tr key={row.id}>
                              {row.cells.map((cell) => (
                                <td key={cell.id}>{cell.text}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
