import { useState } from "react";

import { Course, Question } from "@/types/index";

import DownArrowSvg from "@/assets/down-arrow.svg";

import styles from "./styles/CourseContent.module.css";

type CourseContentProps = {
  course: Course;
};

export const CourseContent = ({ course }: CourseContentProps) => {
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({});

  const toggleTopic = (id: string, hasQuestions: boolean) => {
    if (hasQuestions) {
      setOpenTopics((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const getTopicState = (topicId: string, questions: Question[]) => {
    return {
      hasQuestions: questions.length > 0,
      isOpen: openTopics[topicId] ?? false,
    };
  };

  return (
    <section className={styles.courseWrapper}>
      <div className={styles.course}>
        <img src={course.icon} alt={`${course.title} logo`} />
        <div className={styles.naming}>
          <h1 className={styles.courseTitle}>{course.title}</h1>
          <p className={styles.description}>{course.description}</p>
        </div>
      </div>

      {course.topics ? (
        <article className={styles.topics}>
          {course.topics.map((topic, topicIndex) => {
            const { hasQuestions, isOpen } = getTopicState(
              topic.id,
              topic.questions,
            );

            return (
              <div key={topic.id} className={styles.topic}>
                <button
                  onClick={() => toggleTopic(topic.id, hasQuestions)}
                  className={`${styles.topicTitle} ${!hasQuestions ? styles.noQuestions : ""}`}
                >
                  <span
                    className={styles.topicTitleText}
                    data-index={topicIndex + 1}
                  >
                    {topic.title}
                  </span>
                  <img
                    src={DownArrowSvg}
                    alt="toggle"
                    className={`${styles.arrowIcon} ${isOpen ? styles.open : ""} ${!hasQuestions ? styles.hidden : ""}`}
                  />
                </button>

                {hasQuestions && (
                  <div
                    className={`${styles.questionsWrapper} ${isOpen ? styles.open : ""}`}
                  >
                    <div className={styles.questionsInner}>
                      <ul className={styles.questions}>
                        {topic.questions.map((q, qIndex) => (
                          <li key={q.id} data-index={qIndex + 1}>
                            <a href="#">{q.text}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </article>
      ) : (
        <p className={styles.soon}>Курс у розробці</p>
      )}
    </section>
  );
};
