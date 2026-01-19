import { useEffect, useState } from "react";

import styles from "./styles/ScrollDots.module.css";

const sections = ["hero", "advantages"];

export const ScrollDots = () => {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      {sections.map((id) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`${styles.dot} ${active === id ? styles.active : ""}`}
        />
      ))}
    </div>
  );
};
