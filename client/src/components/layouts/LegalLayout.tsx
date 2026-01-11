import { useEffect } from "react";
import { Outlet, useMatches } from "react-router-dom";

import styles from "./styles/LegalLayout.module.css";

export const LegalLayout = () => {
  const matches = useMatches();

  useEffect(() => {
    if (typeof document === "undefined") return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    let title: string | undefined;

    for (let i = matches.length - 1; i >= 0; i--) {
      const handle = matches[i]?.handle as { title?: string } | undefined;

      if (handle?.title) {
        title = handle.title;
        break;
      }
    }

    if (title) document.title = title;
  }, [matches]);

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
