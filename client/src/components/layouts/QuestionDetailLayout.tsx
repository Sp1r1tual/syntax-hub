import { Outlet } from "react-router-dom";

import { QuestionSidebar } from "../ui/side/QuestionSidebar";

import styles from "./styles/QuestionDetailLayout.module.css";

export const QuestionDetailLayout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.sideBarWrapper}>
        <QuestionSidebar />
      </div>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
