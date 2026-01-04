import { Link } from "react-router-dom";

import { useCoursesStore } from "@/store/courses/useCoursesStore";

import styles from "./styles/Courses.module.css";

export const Courses = () => {
  const { coursesList } = useCoursesStore();

  return (
    <>
      <section className={styles.coursesWrapper}>
        <p className={styles.coursesHeader}>
          Виберіть курс, який вас цікавить. Тут зібрані різні технології та
          напрямки: від веб-розробки до сучасних фреймворків і мов
          програмування. Деякі курси ще в розробці, але незабаром будуть
          доступні для навчання.
        </p>

        {coursesList.map((group) => (
          <div key={group.key} className={styles.groupSection}>
            <h2 className={styles.groupTitle}>{group.title}</h2>

            <div className={styles.coursesGrid}>
              {group.courses.map((course) => (
                <Link
                  key={course.slug}
                  to={`/courses/${course.slug}`}
                  className={styles.course}
                >
                  {course.icon && (
                    <img
                      src={course.icon}
                      loading="eager"
                      alt={`${course.title} logo`}
                    />
                  )}

                  <div className={styles.naming}>
                    <h4 className={styles.courseTitle}>{course.title}</h4>
                    {course.description && (
                      <p className={styles.description}>{course.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
