import { useEffect } from "react";

import { ICommentData } from "@/common/types";

import { useCommentsStore } from "@/store/courses/useCommentsStore";

import { CommentsList } from "./CommentsList";
import { CommentInput } from "./CommentInput";

import commentSvg from "@/assets/comment.svg";

import styles from "./styles/CommentsSection.module.css";

export const CommentsSection = () => {
  const currentUserId = "1";

  const comments = useCommentsStore((state) => state.comments);
  const setComments = useCommentsStore((state) => state.setComments);

  useEffect(() => {
    const mockComments: ICommentData[] = [
      {
        id: "1",
        userId: "1",
        username: "Олександр Коваленко",
        avatar: "https://i.pravatar.cc/150?img=12",
        text: "Дуже цікава стаття! Особливо сподобалась частина про архітектуру системи.",
        createdAt: new Date(2024, 0, 5, 14, 30),
        likes: 12,
        images: [],
        replies: [],
      },
    ];
    setComments(mockComments);
  }, [setComments]);

  const handleDelete = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const handleReply = (parentId: string, text: string, _images: File[]) => {
    const newComment: ICommentData = {
      id: Date.now().toString(),
      userId: currentUserId,
      username: "Я",
      text,
      createdAt: new Date(),
      likes: 0,
      images: [],
      replies: [],
    };

    setComments(
      comments.map((c) =>
        c.id === parentId ? { ...c, replies: [...c.replies, newComment] } : c,
      ),
    );
  };

  const handleLike = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)),
    );
  };

  const handleEdit = (id: string, text: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, text } : c)));
  };

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
          <span>{comments.length} коментарів</span>
        </div>
      </div>

      <div className={styles.input}>
        <CommentInput />
      </div>

      <div className={styles.commentsList}>
        <CommentsList
          comments={comments}
          currentUserId={currentUserId}
          onDelete={handleDelete}
          onReply={handleReply}
          onLike={handleLike}
          onEdit={handleEdit}
        />
      </div>
    </section>
  );
};
