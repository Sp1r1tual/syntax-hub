import { PublicUserType } from "@/common/types";

import { useRevealOnScroll } from "@/hooks/ui/useRevealOnScroll";
import { useModalsStore } from "@/store/modal/useModalsStore";
import { useAuthStore } from "@/store/auth/useAuthStore";

import githubSvg from "@/assets/github-icon.svg";
import telegramSvg from "@/assets/telegram-icon.svg";
import instagramSvg from "@/assets/instagram-icon.svg";

import styles from "./styles/Authors.module.css";

export interface IAuthorsProps {
  authors: PublicUserType[];
}

export const Authors = ({ authors }: IAuthorsProps) => {
  if (!styles.visible) throw new Error("Class visible not found in CSS Module");
  const itemsRef = useRevealOnScroll(styles.visible!);

  const { openPublicProfileModal, openAuthModal } = useModalsStore();
  const { user } = useAuthStore();

  if (!authors || authors.length === 0) return null;

  const openPublicProfile = (authorId: string) => {
    if (!user) {
      openAuthModal();
      return;
    }

    openPublicProfileModal(authorId);
  };

  const title = authors.length === 1 ? "Автор курсу" : "Автори курсу";

  return (
    <section>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.authorsWrapper}>
        {authors.map((author, idx) => (
          <div
            key={author.id}
            ref={(el) => {
              if (el) itemsRef.current[idx] = el;
            }}
            className={styles.authorCard}
          >
            <div className={styles.infoWrapper}>
              <img
                src={author.avatar}
                alt={author.name ?? "Avatar"}
                className={styles.authorAvatar}
              />
              <a
                className={styles.authorName}
                onClick={() => openPublicProfile(author.id)}
              >
                {author.name ?? "Не вказано"}
              </a>
            </div>

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
