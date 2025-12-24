import { useState, useEffect } from "react";

import HeroLogoLightPng from "@/assets/hero-logo-light.png";

import styles from "./styles/Hero.module.css";

const WORDS = ["НАВИЧОК", "ЗНАНЬ", "ІДЕЙ"];

export const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = WORDS[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (!currentWord) return;

          if (displayedText.length < currentWord.length) {
            setDisplayedText(currentWord.slice(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
          }
        }
      },
      isDeleting ? 50 : 150,
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <section className={styles.hero}>
      <div className={styles.typingContainer}>
        <span className={styles.staticText}>{"> ЗАВАНТАЖЕННЯ_ТВОЇХ_"}</span>
        <span className={styles.typingText}>
          {displayedText}
          <span className={styles.cursor}>_</span>
        </span>
      </div>

      <img
        src={HeroLogoLightPng}
        alt="SyntaxHub logo"
        className={styles.logoImg}
      />

      <p className={styles.text}>
        Розвивай свої навички, відкривай нові можливості та напрямки для
        розвитку. Ми допомагаємо повірити в себе і впевнено рухатися вперед.
      </p>
    </section>
  );
};
