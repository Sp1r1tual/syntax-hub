import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/sections/hero/Hero";

import styles from "./styles/MainPage.module.css";

export const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <Navbar />
      <div className={styles.content}>
        <Hero />
      </div>
      <Footer />
    </div>
  );
};
