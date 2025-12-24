import { Link } from "react-router-dom";

import HTMLLogoPng from "@/assets/html-logo.png";
import CSSLogoPng from "@/assets/css-logo.png";
import JavaScriptLogoPng from "@/assets/JavaScript-logo.png";
import ReactLogoPng from "@/assets/react-logo.png";

import styles from "./styles/Courses.module.css";

export const Courses = () => {
  return (
    <section className={styles.coursesWrapper}>
      <p className={styles.coursesHeader}>
        Виберіть курс, який вас цікавить. Тут зібрані різні технології та
        напрямки: від веб-розробки до сучасних фреймворків і мов програмування.
        Деякі курси ще в розробці, але незабаром будуть доступні для навчання.
      </p>
      <h3 className={styles.courseSectionTitle}>Frontend</h3>

      <Link to="/courses" className={styles.course}>
        <img src={HTMLLogoPng} alt="HTML logo" />
        <div className={styles.naming}>
          <h3 className={styles.courseTitle}>HTML</h3>
          <p className={styles.description}>Скоро буде!</p>
        </div>
      </Link>

      <Link to="/courses" className={styles.course}>
        <img src={CSSLogoPng} alt="CSS logo" />
        <div className={styles.naming}>
          <h3 className={styles.courseTitle}>CSS</h3>
          <p className={styles.description}>Скоро буде!</p>
        </div>
      </Link>

      <Link to="/courses/java-script" className={styles.course}>
        <img src={JavaScriptLogoPng} alt="JavaScript logo" />
        <div className={styles.naming}>
          <h3 className={styles.courseTitle}>JavaScript</h3>
          <p className={styles.description}>
            Основний інструмент для роботи з вебом та сучасними додатками. Додає
            життя вашому сайту: кнопки, анімації та динамічний контент
          </p>
        </div>
      </Link>

      <Link to="/courses" className={styles.course}>
        <img src={ReactLogoPng} alt="React logo" />
        <div className={styles.naming}>
          <h3 className={styles.courseTitle}>React</h3>
          <p className={styles.description}>Скоро буде!</p>
        </div>
      </Link>
    </section>
  );
};
