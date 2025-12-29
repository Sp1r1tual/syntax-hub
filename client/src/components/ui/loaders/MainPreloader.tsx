import preloaderGif from "@/assets/main-preloader.gif";

import styles from "./styles/MainPreloader.module.css";

interface IMainPreLoaderProps {
  fadeOut?: boolean;
}

export const MainPreLoader = ({ fadeOut = false }: IMainPreLoaderProps) => {
  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ""}`}>
      <div className={styles.content}>
        <img
          src={preloaderGif}
          alt="Loading..."
          className={styles.preloaderGif}
        />
        <p className={styles.loadingText}>Завантажуємось...</p>
      </div>
    </div>
  );
};
