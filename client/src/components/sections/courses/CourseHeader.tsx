import { ICourseNavigation } from "@/common/types";
import { ImageWithSkeleton } from "@/components/ui/skeletons/ImageWithSkeleton";

import styles from "./styles/CourseHeader.module.css";

interface ICourseHeaderProps {
  course: ICourseNavigation;
}

export const CourseHeader = ({ course }: ICourseHeaderProps) => {
  return (
    <>
      <h3 className={styles.topicsHeader}>Деталі курсу</h3>

      <div className={styles.course}>
        {course.icon && (
          <ImageWithSkeleton
            src={course.icon}
            alt={`${course.title} logo`}
            width={80}
            height={80}
            className={styles.courseImage}
          />
        )}
        <div className={styles.naming}>
          <h1 className={styles.courseTitle}>{course.title}</h1>
          <p className={styles.description}>{course.description}</p>
        </div>
      </div>
    </>
  );
};
