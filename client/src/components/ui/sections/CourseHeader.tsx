import { ICourseNavigation } from "@/common/types";

import styles from "./styles/CourseHeader.module.css";

interface ICourseHeaderProps {
  course: ICourseNavigation;
}

export const CourseHeader = ({ course }: ICourseHeaderProps) => {
  return (
    <>
      <h3 className={styles.topicsHeader}>Деталі курсу</h3>

      <div className={styles.course}>
        {course.icon && <img src={course.icon} alt={`${course.title} logo`} />}
        <div className={styles.naming}>
          <h1 className={styles.courseTitle}>{course.title}</h1>
          <p className={styles.description}>{course.description}</p>
        </div>
      </div>
    </>
  );
};
