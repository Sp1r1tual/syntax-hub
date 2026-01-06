import { Comment } from "./Comment";
import { CommentInput } from "./CommentInput";

import commentSvg from "@/assets/comment.svg";
import styles from "./styles/CommentsSection.module.css";

export const CommentsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.headerWrapper}>
        <header className={styles.header}>
          <div className={styles.title}>
            <div className={styles.head}>
              <img src={commentSvg} alt="Comments" />
              <h3>Коментарі</h3>
            </div>

            <a href="#">Прочитайте це, перш ніж коментувати</a>
          </div>
        </header>

        <div className={styles.meta}>
          <span>0 comments</span>
        </div>
      </div>

      <div className={styles.input}>
        <CommentInput />
      </div>

      <div className={styles.commentsList}>
        <Comment />
      </div>
    </section>
  );
};
