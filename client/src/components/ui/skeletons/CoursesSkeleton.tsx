import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "@/components/sections/courses/styles/Courses.module.css";

export const CoursesSkeleton = () => {
  return (
    <section className={styles.coursesWrapper}>
      <p className={styles.coursesHeader}>
        <Skeleton count={2} height={16} />
      </p>

      <div className={styles.groupSection}>
        <h2 className={styles.groupTitle}>
          <Skeleton width={100} height={16} />
        </h2>

        <div className={styles.coursesGrid}>
          {Array.from({ length: 4 }, (_, index) => (
            <div key={`course-skeleton-1-${index}`} className={styles.course}>
              <Skeleton width={48} height={48} borderRadius={4} />
              <div className={styles.naming}>
                <Skeleton
                  width="70%"
                  height={23}
                  style={{ marginBottom: "0.5rem" }}
                />
                <Skeleton count={1} height={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
