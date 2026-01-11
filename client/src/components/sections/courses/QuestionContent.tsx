import { IQuestionDetail } from "@/common/types/index";

import { useModalsStore } from "@/store/modal/useModalsStore";

import { TextBlock } from "@/components/ui/content/TextBlock";
import { MarkQuestionAs } from "./MarkQuestionAs";

import { CommonButton } from "@/components/ui/buttons/CommonButton";

import styles from "./styles/QuestionContent.module.css";

interface ICourseQuestionContentProps {
  question: IQuestionDetail;
}

export const QuestionContent = ({ question }: ICourseQuestionContentProps) => {
  const { openMobileTopicsModal } = useModalsStore();

  return (
    <>
      <div className={styles.commonBtnWrapper}>
        <CommonButton text="Показати теми" onClick={openMobileTopicsModal} />
      </div>

      <article className={styles.article}>
        <h1 className={styles.title}>{question.text}</h1>

        <div className={styles.blocks}>
          <div className={styles.content}>
            <TextBlock content={question.content} />
          </div>

          <MarkQuestionAs questionId={question.id} />
        </div>
      </article>
    </>
  );
};
