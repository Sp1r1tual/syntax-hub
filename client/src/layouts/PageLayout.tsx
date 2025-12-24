import { useEffect } from "react";
import { Outlet, useMatches } from "react-router-dom";

import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";

import styles from "./styles/PageLyout.module.css";

export const PageLayout = () => {
  const matches = useMatches();

  useEffect(() => {
    if (typeof document === "undefined") return;

    let title: string | undefined;

    for (let i = matches.length - 1; i >= 0; i--) {
      const handle = matches[i]?.handle;

      if (handle && typeof handle === "object" && "title" in handle) {
        title = (handle as { title?: string }).title;

        if (title) break;
      }
    }

    if (title) {
      document.title = title;
    }
  }, [matches]);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
