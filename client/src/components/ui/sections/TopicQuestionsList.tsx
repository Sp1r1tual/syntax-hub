import { Link } from "react-router-dom";

import { IQuestion } from "@/common/types";

import styles from "./styles/TopicQuestionsList.module.css";

interface ITopicQuestionsListProps {
  questions: IQuestion[];
  courseSlug: string;
  isOpen: boolean;
}

export const TopicQuestionsList = ({
  questions,
  courseSlug,
  isOpen,
}: ITopicQuestionsListProps) => {
  return (
    <div className={`${styles.questionsWrapper} ${isOpen ? styles.open : ""}`}>
      <div className={styles.questionsInner}>
        <ul className={styles.questions}>
          {questions.map((question, index) => (
            <li key={question.id} data-index={index + 1}>
              <Link to={`/courses/${courseSlug}/questions/${question.id}`}>
                {question.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
