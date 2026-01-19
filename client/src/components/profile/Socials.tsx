import { ISocials } from "@/common/types";

import githubSvg from "@/assets/github-icon.svg";
import telegramSvg from "@/assets/telegram-icon.svg";
import instagramSvg from "@/assets/instagram-icon.svg";

import styles from "./styles/Socials.module.css";

interface ISocialsProps {
  socials: ISocials | undefined;
}

export const Socials = ({ socials }: ISocialsProps) => {
  return (
    <>
      {socials ? (
        <div>
          <p className={styles.text}>Соціальні мережі:</p>

          <div className={styles.socialsWrapper}>
            {socials.githubUrl && (
              <a
                href={socials.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <img src={githubSvg} className={styles.icons} />
                GitHub
              </a>
            )}
            {socials.telegramUrl && (
              <a
                href={socials.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <img src={telegramSvg} className={styles.icons} />
                Telegram
              </a>
            )}
            {socials.instagramUrl && (
              <a
                href={socials.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <img src={instagramSvg} className={styles.icons} />
                Instagram
              </a>
            )}
          </div>
        </div>
      ) : (
        <p className={styles.text}>Немає соціальних мереж</p>
      )}
    </>
  );
};
