import { INewsResponse } from "@/common/types";

import { useToggleLike } from "@/hooks/queries/useNewsQueries";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useModalsStore } from "@/store/modal/useModalsStore";

import { LikeButton } from "@/components/ui/buttons/LikeButton";
import { TextBlock } from "@/components/ui/content/TextBlock";

import styles from "./styles/NewsContent.module.css";

interface INewsContentProps {
  news: INewsResponse;
}

export const NewsContent = ({ news }: INewsContentProps) => {
  const toggleLikeMutation = useToggleLike();

  const { user } = useAuthStore();
  const { openAuthModal } = useModalsStore();

  const handleLikeClick = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    toggleLikeMutation.mutate(news.id);
  };

  return (
    <section className={styles.newsSection}>
      <h2 className={styles.title}>{news.title}</h2>
      <p className={styles.date}>
        {new Date(news.createdAt).toLocaleDateString()}
      </p>

      <div className={styles.content}>
        <TextBlock content={news.content} />
      </div>

      <div className={styles.likesSection}>
        <LikeButton
          isLiked={news.liked}
          likesCount={news.likes}
          onToggle={handleLikeClick}
        />
      </div>
    </section>
  );
};
