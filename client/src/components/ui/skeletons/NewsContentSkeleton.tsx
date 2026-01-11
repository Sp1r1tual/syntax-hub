import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "@/components/sections/community/styles/NewsContent.module.css";

interface NewsContentSkeletonProps {
  cards?: number;
}

export const NewsContentSkeleton = ({
  cards = 3,
}: NewsContentSkeletonProps) => {
  return (
    <>
      {Array.from({ length: cards }, (_, index) => (
        <section className={styles.newsSection} key={`skeleton-${index}`}>
          <h2 className={styles.title}>
            <Skeleton width="70%" height={24} />
          </h2>

          <p className={styles.date}>
            <Skeleton width={100} height={14} />
          </p>

          <div className={styles.content}>
            <Skeleton
              count={12}
              height={16}
              style={{ marginBottom: "0.5rem" }}
            />
            <Skeleton width="80%" height={16} />
          </div>

          <div className={styles.likesSection}>
            <Skeleton width={80} height={32} borderRadius={20} />
          </div>
        </section>
      ))}
    </>
  );
};
