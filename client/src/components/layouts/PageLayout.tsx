import { useEffect } from "react";
import { Outlet, useMatches, useParams } from "react-router-dom";

import { useCoursesStore } from "@/store/courses/useCoursesStore";

import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";

import styles from "./styles/PageLyout.module.css";

export const PageLayout = () => {
  const matches = useMatches();
  const { courseSlug } = useParams();
  const { selectedCourse, coursesList } = useCoursesStore();

  useEffect(() => {
    if (typeof document === "undefined") return;

    let title: string | undefined;

    if (courseSlug) {
      if (selectedCourse && selectedCourse.slug === courseSlug) {
        title = `${selectedCourse.title} | SyntaxHub`;
      } else {
        for (const group of coursesList) {
          const course = group.courses.find((c) => c.slug === courseSlug);

          if (course) {
            title = `${course.title} | SyntaxHub`;
            break;
          }
        }
      }
    }

    if (!title) {
      for (let i = matches.length - 1; i >= 0; i--) {
        const handle = matches[i]?.handle as { title?: string } | undefined;

        if (handle?.title) {
          title = handle.title;
          break;
        }
      }
    }

    if (title) document.title = title;
  }, [matches, courseSlug, selectedCourse, coursesList]);

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
