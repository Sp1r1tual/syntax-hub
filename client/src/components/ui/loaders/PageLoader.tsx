import { useState, useEffect } from "react";

import styles from "./styles/PageLoader.module.css";

interface IPageLoaderProps {
  isLoading: boolean;
  delay?: number;
}

export const PageLoader = ({ isLoading, delay = 200 }: IPageLoaderProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mountTimeout: NodeJS.Timeout;
    let unmountTimeout: NodeJS.Timeout;

    if (isLoading) {
      mountTimeout = setTimeout(() => {
        setShouldRender(true);
        setTimeout(() => setIsVisible(true), 50);
      }, delay);
    } else if (shouldRender) {
      unmountTimeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setShouldRender(false);
        }, 300);
      }, 0);
    }

    return () => {
      clearTimeout(mountTimeout);
      clearTimeout(unmountTimeout);
    };
  }, [isLoading, delay, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className={`${styles.overlay} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner} />
      </div>
    </div>
  );
};
