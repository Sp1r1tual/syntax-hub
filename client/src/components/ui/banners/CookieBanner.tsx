import { useState } from "react";

import styles from "./styles/CookieBanner.module.css";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem("cookiesAccepted");
  });

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.textWrapper}>
        <p>Цей сайт використовує файли cookie для покращення роботи сайту.</p>
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Детальніше
        </a>
      </div>

      <button onClick={handleAccept}>Прийняти</button>
    </div>
  );
};
