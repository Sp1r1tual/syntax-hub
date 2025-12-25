import { useRef } from "react";
import { useThemeStore } from "@/store/theme/useThemeStore";
import LightModeSvg from "@/assets/light-mode.svg";
import DarkModeSvg from "@/assets/dark-mode.svg";
import styles from "./styles/ThemeButton.module.css";

export const ThemeButton = () => {
  const { isDarkTheme, toggleTheme } = useThemeStore();
  const iconRef = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    const fadeClass = styles.fade;

    if (iconRef.current && fadeClass) {
      iconRef.current.classList.add(fadeClass);

      setTimeout(() => {
        iconRef.current?.classList.remove(fadeClass);
      }, 400);
    }

    toggleTheme();
  };

  return (
    <button className={styles.themeToggler} onClick={handleClick}>
      <img
        ref={iconRef}
        src={isDarkTheme ? LightModeSvg : DarkModeSvg}
        alt="theme toggler"
        className={styles.themeTogglerImg}
      />
    </button>
  );
};
