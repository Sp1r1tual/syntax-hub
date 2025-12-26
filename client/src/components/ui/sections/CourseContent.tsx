import { useState } from "react";

import { ICourse, IQuestion } from "@/types/index";

import DownArrowSvg from "@/assets/down-arrow.svg";

import styles from "./styles/CourseContent.module.css";

interface ICourseContentProps {
  course: ICourse;
}

export const CourseContent = ({ course }: ICourseContentProps) => {
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({});

  const toggleTopic = (id: string, hasQuestions: boolean) => {
    if (hasQuestions) {
      setOpenTopics((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const getTopicState = (topicId: string, questions: IQuestion[]) => {
    return {
      hasQuestions: questions.length > 0,
      isOpen: !!openTopics[topicId],
    };
  };

  return (
    <section className={styles.courseWrapper}>
      <h3 className={styles.topicsHeader}>Деталі курсу</h3>

      <div className={styles.course}>
        <img src={course.icon} alt={`${course.title} logo`} />
        <div className={styles.naming}>
          <h1 className={styles.courseTitle}>{course.title}</h1>
          <p className={styles.description}>{course.description}</p>
        </div>
      </div>

      <h3 className={styles.topicsHeader}>Дорожня карта</h3>

      <div className={styles.roadmapIntro}>
        <p>
          Дорожні карти допомагають структурувати процес навчання та бачити
          повну картину курсу. Вони покажуть, з чого почати, які теми вивчати
          далі і як закріплювати знання за допомогою практичних запитань.
          Використовуючи дорожні карти, ви зможете впевнено рухатися від
          базового рівня до складніших тем, не пропускаючи важливі кроки.
        </p>
        <button className={styles.openRoadmapBtn} onClick={undefined}>
          Відкрити дорожню карту по {course.title}
        </button>
      </div>

      <h3 className={styles.topicsHeader}>Теми для вивчення</h3>

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
