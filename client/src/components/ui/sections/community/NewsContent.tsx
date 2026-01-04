import { INewsResponse } from "@/common/types";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useNewsStore } from "@/store/news/useNewsStore";
import { useModalsStore } from "@/store/modal/useModalsStore";

import { LikeButton } from "../../buttons/LikeButton";
import { ListBlock } from "../../content/ListBlock";
import { ImageBlock } from "../../content/ImageBlock";
import { TextBlock } from "../../content/TextBlock";

import styles from "./styles/NewsContent.module.css";

interface NewsContentProps {
  news: INewsResponse;
}

export const NewsContent = ({ news }: NewsContentProps) => {
  const toggleLike = useNewsStore((state) => state.toggleLike);

  const { user } = useAuthStore();
  const { openAuthModal } = useModalsStore();

  const handleLikeClick = () => {
    if (!user) {
      openAuthModal();
      return;
    }

    toggleLike(news.id);
  };

  return (
    <section className={styles.newsSection}>
      <h2 className={styles.title}>{news.title}</h2>
      <p className={styles.date}>
        {new Date(news.createdAt).toLocaleDateString()}
      </p>

      <div className={styles.content}>
        {news.content.map((block) => {
          switch (block.type) {
            case "TEXT":
              return (
                <TextBlock
                  key={block.id}
                  id={block.id}
                  content={block.content}
                />
              );

            case "IMAGE":
              return (
                <ImageBlock
                  key={block.id}
                  id={block.id}
                  src={block.src}
                  alt={block.alt}
                  caption={block.caption}
                />
              );

            case "LIST":
              return (
                <ListBlock
                  key={block.id}
                  id={block.id}
                  items={block.items}
                  title={block.title}
                  ordered={block.ordered}
                />
              );

            default:
              return null;
          }
        })}
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
