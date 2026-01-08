import { Outlet } from "react-router-dom";

import styles from "./styles/LegalLayout.module.css";

export const LegalLayout = () => {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
