import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "@/components/sections/courses/comments/styles/CommentsSection.module.css";
import commentStyles from "@/components/sections/courses/comments/styles/CommentItem.module.css";

export const CommentsSkeleton = () => {
  return (
    <section className={styles.section}>
      <div className={styles.headerWrapper}>
        <header className={styles.header}>
          <div className={styles.title}>
            <div className={styles.head}>
              <Skeleton width={20} height={20} />
              <h3>
                <Skeleton width={100} height={20} />
              </h3>
            </div>
            <Skeleton width={250} height={16} />
          </div>
        </header>

        <div className={styles.meta}>
          <Skeleton width={120} height={16} />
        </div>
      </div>

      <div className={styles.input}>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "flex-start",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Skeleton width={56} height={56} borderRadius={8} />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                background: "var(--bg-secondary-solid)",
                border: "1px solid var(--border-color)",
                borderRadius: "10px",
                padding: "10px 12px",
              }}
            >
              <Skeleton height={40} style={{ marginBottom: "0.5rem" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Skeleton width={40} height={32} borderRadius={6} />
                  <Skeleton width={40} height={32} borderRadius={6} />
                </div>
                <Skeleton width={100} height={32} borderRadius={6} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.commentsList}>
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={`comment-skeleton-${index}`}
            className={commentStyles.commentWrapper}
          >
            <div className={commentStyles.commentContainer}>
              <Skeleton width={56} height={56} borderRadius={8} />

              <div className={commentStyles.body}>
                <div className={commentStyles.commentBody}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <Skeleton width={120} height={16} />
                    <Skeleton width={100} height={14} />
                  </div>

                  <Skeleton
                    count={2}
                    height={16}
                    style={{ marginBottom: "0.5rem" }}
                  />
                  <Skeleton width="80%" height={16} />
                </div>

                <div
                  style={{
                    marginTop: "0.5rem",
                    marginLeft: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Skeleton width={80} height={14} />
                  <Skeleton width={60} height={32} borderRadius={20} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
