import { ITopic } from "@/common/types";

import { TopicItem } from "./TopicItem";

import styles from "./styles/TopicsList.module.css";

interface ITopicsListProps {
  topics: ITopic[];
  courseSlug: string;
  openTopics: Record<string, boolean>;
  onToggleTopic: (topicId: string, hasQuestions: boolean) => void;
}

export const TopicsList = ({
  topics,
  courseSlug,
  openTopics,
  onToggleTopic,
}: ITopicsListProps) => {
  return (
    <article className={styles.topics}>
      {topics.map((topic, topicIndex) => (
        <TopicItem
          key={topic.id}
          topic={topic}
          topicIndex={topicIndex}
          courseSlug={courseSlug}
          isOpen={!!openTopics[topic.id]}
          onToggle={onToggleTopic}
        />
      ))}
    </article>
  );
};
