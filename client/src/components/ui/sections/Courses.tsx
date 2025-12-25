import { Link } from "react-router-dom";

import { groupCoursesByCategory } from "@/utils/groupCoursesByCategory";

import styles from "./styles/Courses.module.css";

export const Courses = () => {
  const categories = groupCoursesByCategory();

  return (
    <section className={styles.coursesWrapper}>
      <p className={styles.coursesHeader}>
        Виберіть курс, який вас цікавить. Тут зібрані різні технології та
        напрямки: від веб-розробки до сучасних фреймворків і мов програмування.
        Деякі курси ще в розробці, але незабаром будуть доступні для навчання.
      </p>

      {Object.entries(categories).map(([categorySlug, category]) => (
        <div key={categorySlug} className={styles.categoryBlock}>
          <h3 className={styles.courseSectionTitle}>{category.title}</h3>

          <div className={styles.coursesGrid}>
            {category.courses.map((course) => (
              <Link
                key={course.slug}
                to={`/courses/${course.slug}`}
                className={styles.course}
              >
                <img src={course.icon} alt={`${course.title} logo`} />

                <div className={styles.naming}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.description}>{course.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
