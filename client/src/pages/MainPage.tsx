import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";

import styles from "./styles/MainPage.module.css";

export const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <Navbar />
      <div className={styles.content}>
        <span>empty space</span>
      </div>
      <Footer />
    </div>
  );
};
