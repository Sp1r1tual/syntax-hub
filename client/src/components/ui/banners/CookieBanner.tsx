import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./styles/CookieBanner.module.css";

export const CookieBanner = () => {
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem("cookiesAccepted");
  });

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const handleLinkClick = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const shouldReopen = sessionStorage.getItem("reopenCookieBanner");

    if (shouldReopen === "true") {
      if (!localStorage.getItem("cookiesAccepted")) {
        setTimeout(() => {
          setIsVisible(true);
          sessionStorage.removeItem("reopenCookieBanner");
        }, 100);
      } else {
        sessionStorage.removeItem("reopenCookieBanner");
      }
    }
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.textWrapper}>
        <p>Цей сайт використовує файли cookie для покращення роботи сайту.</p>
        <Link
          to="/privacy-policy"
          state={{ fromMainPage: true }}
          onClick={handleLinkClick}
        >
          Детальніше
        </Link>
      </div>

      <button onClick={handleAccept}>Прийняти</button>
    </div>
  );
};
