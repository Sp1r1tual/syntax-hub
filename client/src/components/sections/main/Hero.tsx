import { useEffect, useRef } from "react";

import HeroLogoLightPng from "@/assets/hero-logo-light.png";

import styles from "./styles/Hero.module.css";

const WORDS = ["НАВИЧОК", "ЗНАНЬ", "ІДЕЙ"];

export const Hero = () => {
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const timeoutRef = useRef<number>(null);

  useEffect(() => {
    const type = () => {
      const currentWord = WORDS[wordIndexRef.current] ?? "";
      if (!spanRef.current) return;

      if (!isDeletingRef.current) {
        spanRef.current.textContent = currentWord.slice(
          0,
          charIndexRef.current + 1,
        );
        charIndexRef.current += 1;

        if (charIndexRef.current === currentWord.length) {
          timeoutRef.current = window.setTimeout(() => {
            isDeletingRef.current = true;
            tick();
          }, 2000);
          return;
        }
      } else {
        charIndexRef.current -= 1;
        spanRef.current.textContent = currentWord.slice(
          0,
          charIndexRef.current,
        );

        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          wordIndexRef.current = (wordIndexRef.current + 1) % WORDS.length;
        }
      }

      tick();
    };

    const tick = () => {
      const delay = isDeletingRef.current ? 50 : 150;
      timeoutRef.current = window.setTimeout(type, delay);
    };

    tick();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.typingContainer}>
        <span className={styles.staticText}>{"> ЗАВАНТАЖЕННЯ_ТВОЇХ_"}</span>
        <span className={styles.typingText}>
          <span ref={spanRef} />
          <span className={styles.cursor}>_</span>
        </span>
      </div>

      <div className={styles.imgWrapper}>
        <img
          src={HeroLogoLightPng}
          alt="SyntaxHub logo"
          className={styles.logoImg}
        />
      </div>

      <p className={styles.text}>
        Розвивай свої навички, відкривай нові можливості та напрямки для
        розвитку. Ми допомагаємо повірити в себе і впевнено рухатися вперед.
      </p>
    </section>
  );
};
