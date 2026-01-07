import { Link } from "react-router-dom";

import { useCourseSidebarStore } from "@/store/ui/useCourseSidebarStore";

import DownArrowSvg from "@/assets/down-arrow.svg";

import styles from "./styles/TopicSection.module.css";

interface ITopicSectionProps {
  topic: {
    id: string;
    title: string;
    questions: Array<{
      id: string;
      text: string;
    }>;
  };
  topicIndex: number;
  questionId: string | undefined;
  courseSlug: string;
  toggleTopic: (topicId: string) => void;
  closeMobileTopicsModal: () => void;
}

export const TopicSection = ({
  topic,
  topicIndex,
  questionId,
  courseSlug,
  toggleTopic,
  closeMobileTopicsModal,
}: ITopicSectionProps) => {
  const isOpen = useCourseSidebarStore((s) => s.openTopics[topic.id]);

  const hasQuestions = topic.questions.length > 0;

  return (
    <div className={styles.topicSection}>
      <button
        className={`${styles.topicButton} ${
          !hasQuestions ? styles.disabled : ""
        }`}
        onClick={() => hasQuestions && toggleTopic(topic.id)}
        disabled={!hasQuestions}
      >
        <span className={styles.topicNumber}>{topicIndex + 1}.</span>
        <span className={styles.topicTitle}>{topic.title}</span>

        {hasQuestions && (
          <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
            <img src={DownArrowSvg} alt="▼" className={styles.downArrowImg} />
          </span>
        )}
      </button>

      {hasQuestions && (
        <div
          className={`${styles.questionsWrapper} ${isOpen ? styles.open : ""}`}
        >
          <ul className={styles.questions}>
            {topic.questions.map((question) => {
              const isActive = question.id === questionId;

              return (
                <li key={question.id} className={isActive ? styles.active : ""}>
                  <Link
                    onClick={closeMobileTopicsModal}
                    to={`/courses/${courseSlug}/questions/${question.id}`}
                  >
                    {question.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
