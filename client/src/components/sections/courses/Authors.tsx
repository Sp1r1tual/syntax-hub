import { ICourseAuthor } from "@/common/types";

import { useRevealOnScroll } from "@/hooks/ui/useRevealOnScroll";

import githubSvg from "@/assets/github-icon.svg";
import telegramSvg from "@/assets/telegram-icon.svg";
import instagramSvg from "@/assets/instagram-icon.svg";

import styles from "./styles/Authors.module.css";

export interface IAuthorsProps {
  authors: ICourseAuthor[];
}

export const Authors = ({ authors }: IAuthorsProps) => {
  if (!styles.visible) throw new Error("Class visible not found in CSS Module");
  const itemsRef = useRevealOnScroll(styles.visible!);

  if (!authors || authors.length === 0) return null;

  return (
    <section>
      <h3 className={styles.title}>Автори курсу</h3>

      <div className={styles.authorsWrapper}>
        {authors.map((author, idx) => (
          <div
            key={author.id}
            ref={(el) => {
              if (el) itemsRef.current[idx] = el;
            }}
            className={styles.authorCard}
          >
            <img
              src={author.avatar}
              alt={author.name ?? "Avatar"}
              className={styles.authorAvatar}
            />
            <h4 className={styles.authorName}>{author.name ?? "Не вказано"}</h4>
            <div className={styles.authorSocials}>
              {author.socials?.telegramUrl && (
                <a
                  href={author.socials.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={telegramSvg} className={styles.icons} />
                  Telegram
                </a>
              )}
              {author.socials?.githubUrl && (
                <a
                  href={author.socials.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={githubSvg} className={styles.icons} />
                  GitHub
                </a>
              )}
              {author.socials?.instagramUrl && (
                <a
                  href={author.socials.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={instagramSvg} className={styles.icons} />
                  Instagram
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
