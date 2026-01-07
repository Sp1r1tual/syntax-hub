import { useParams } from "react-router-dom";

import { useCoursesStore } from "@/store/courses/useCoursesStore";
import { useCourseSidebarStore } from "@/store/ui/useCourseSidebarStore";
import { useModalsStore } from "@/store/modal/useModalsStore";

import { TopicSection } from "./TopicSection";

import styles from "./styles/QuestionSidebar.module.css";

export const QuestionSidebar = () => {
  const { courseSlug, questionId } = useParams();

  const selectedCourse = useCoursesStore((s) => s.selectedCourse);
  const toggleTopic = useCourseSidebarStore((s) => s.toggleTopic);
  const closeMobileTopicsModal = useModalsStore(
    (s) => s.closeMobileTopicsModal,
  );

  if (!selectedCourse || !courseSlug) return null;

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navigation}>
        {selectedCourse.topics.map((topic, topicIndex) => (
          <TopicSection
            key={topic.id}
            topic={topic}
            topicIndex={topicIndex}
            questionId={questionId}
            courseSlug={courseSlug}
            toggleTopic={toggleTopic}
            closeMobileTopicsModal={closeMobileTopicsModal}
          />
        ))}
      </nav>
    </aside>
  );
};
