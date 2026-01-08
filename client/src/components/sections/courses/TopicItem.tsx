import { ITopic } from "@/common/types";

import { TopicQuestionsList } from "./TopicQuestionsList";

import DownArrowSvg from "@/assets/down-arrow.svg";

import styles from "./styles/TopicItem.module.css";

interface ITopicItemProps {
  topic: ITopic;
  topicIndex: number;
  courseSlug: string;
  isOpen: boolean;
  onToggle: (topicId: string, hasQuestions: boolean) => void;
}

export const TopicItem = ({
  topic,
  topicIndex,
  courseSlug,
  isOpen,
  onToggle,
}: ITopicItemProps) => {
  const hasQuestions = topic.questions.length > 0;

  return (
    <div className={styles.topic}>
      <button
        onClick={() => onToggle(topic.id, hasQuestions)}
        className={`${styles.topicTitle} ${!hasQuestions ? styles.noQuestions : ""}`}
      >
        <span className={styles.topicTitleText} data-index={topicIndex + 1}>
          {topic.title}
        </span>
        <img
          src={DownArrowSvg}
          alt="toggle"
          className={`${styles.arrowIcon} ${isOpen ? styles.open : ""} ${!hasQuestions ? styles.hidden : ""}`}
        />
      </button>

      {hasQuestions && (
        <TopicQuestionsList
          questions={topic.questions}
          courseSlug={courseSlug}
          isOpen={isOpen}
        />
      )}
    </div>
  );
};
