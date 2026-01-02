import { Link, useParams } from "react-router-dom";

import { useCoursesStore } from "@/store/courses/useCoursesStore";
import { useCourseSidebarStore } from "@/store/ui/useCourseSidebarStore";
import { useModalsStore } from "@/store/modal/useModalsStore";

import DownArrowSvg from "@/assets/down-arrow.svg";

import styles from "./styles/QuestionSidebar.module.css";

export const QuestionSidebar = () => {
  const { courseSlug, questionId } = useParams();

  const selectedCourse = useCoursesStore((s) => s.selectedCourse);
  const { openTopics, toggleTopic } = useCourseSidebarStore();

  const { closeMobileTopicsModal } = useModalsStore();

  if (!selectedCourse || !courseSlug) return null;

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navigation}>
        {selectedCourse.topics.map((topic, topicIndex) => {
          const hasQuestions = topic.questions.length > 0;
          const isOpen = openTopics[topic.id];

          return (
            <div key={topic.id} className={styles.topicSection}>
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
                  <span
                    className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
                  >
                    <img
                      src={DownArrowSvg}
                      alt="▼"
                      className={styles.downArrowImg}
                    />
                  </span>
                )}
              </button>

              {hasQuestions && (
                <div
                  className={`${styles.questionsWrapper} ${
                    isOpen ? styles.open : ""
                  }`}
                >
                  <ul className={styles.questions}>
                    {topic.questions.map((question) => {
                      const isActive = question.id === questionId;

                      return (
                        <li
                          key={question.id}
                          className={isActive ? styles.active : ""}
                        >
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
        })}
      </nav>
    </aside>
  );
};
