import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "@/components/sections/courses/styles/CourseContent.module.css";
import headerStyles from "@/components/sections/courses/styles/CourseHeader.module.css";
import roadmapStyles from "@/components/sections/courses/styles/RoadmapSection.module.css";
import topicsStyles from "@/components/sections/courses/styles/TopicsList.module.css";

export const CourseContentSkeleton = () => {
  return (
    <section className={styles.courseWrapper}>
      <h3 className={headerStyles.topicsHeader}>
        <Skeleton height={28} />
      </h3>

      <div className={headerStyles.course}>
        <Skeleton width={120} height={120} borderRadius={4} />
        <div className={headerStyles.naming}>
          <h1 className={headerStyles.courseTitle}>
            <Skeleton width="70%" height={32} />
          </h1>
          <p className={headerStyles.description}>
            <Skeleton count={2} height={20} style={{ lineHeight: 1.8 }} />
          </p>
        </div>
      </div>

      <h3 className={roadmapStyles.topicsHeader}>
        <Skeleton width={180} height={28} />
      </h3>

      <div className={roadmapStyles.roadmapIntro}>
        <p>
          <Skeleton count={4} height={18} style={{ lineHeight: 1.8 }} />
        </p>
        <button className={roadmapStyles.openRoadmapBtn}>
          <Skeleton height={24} />
        </button>
      </div>

      <h3 className={styles.topicsHeader}>
        <Skeleton width={220} height={28} />
      </h3>

      <article className={topicsStyles.topics}>
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={`topic-skeleton-${index}`}
            style={{
              width: "100%",
              padding: "1.25rem",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "12px",
              boxShadow: "0 0 10px var(--border-shadow)",
            }}
          >
            <Skeleton width="30%" height={24} />
          </div>
        ))}
      </article>
    </section>
  );
};
