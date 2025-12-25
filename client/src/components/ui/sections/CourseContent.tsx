import { Course } from "@/types/index";

import { courseIcons } from "@/data/courses/courseIcons";

import styles from "./styles/CourseContent.module.css";

type CourseContentProps = {
  course: Course;
};

export const CourseContent = ({ course }: CourseContentProps) => {
  const iconSrc = courseIcons[course.icon];

  return (
    <section className={styles.courseWrapper}>
      <div className={styles.course}>
        <img src={iconSrc} alt={`${course.title} logo`} />
        <div className={styles.naming}>
          <h1 className={styles.courseTitle}>{course.title}</h1>
          <p className={styles.description}>{course.description}</p>
        </div>
      </div>

      {course.content ? (
        <article>{course.content}</article>
      ) : (
        <p className={styles.soon}>Курс у розробці</p>
      )}
    </section>
  );
};
