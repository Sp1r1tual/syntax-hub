import { useState } from "react";

import { useCoursesStore } from "@/store/courses/useCoursesStore";

import { CourseHeader } from "./CourseHeader";
import { RoadmapSection } from "./RoadmapSection";
import { TopicsList } from "./TopicsList";
import { Authors } from "./Authors";

import styles from "./styles/CourseContent.module.css";

export const CourseContent = () => {
  const { selectedCourse } = useCoursesStore();

  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({});

  const toggleTopic = (topicId: string, hasQuestions: boolean) => {
    if (hasQuestions) {
      setOpenTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
    }
  };

  const handleOpenRoadmap = () => {
    alert("Дорожня карта у розробці");
  };

  if (!selectedCourse) {
    return null;
  }

  const hasTopics = selectedCourse.topics && selectedCourse.topics.length > 0;

  return (
    <section className={styles.courseWrapper}>
      <CourseHeader course={selectedCourse} />

      <RoadmapSection
        courseName={selectedCourse.title}
        onOpenRoadmap={handleOpenRoadmap}
      />

      <h3 className={styles.topicsHeader}>Теми для вивчення</h3>

      {hasTopics ? (
        <TopicsList
          topics={selectedCourse.topics!}
          courseSlug={selectedCourse.slug}
          openTopics={openTopics}
          onToggleTopic={toggleTopic}
        />
      ) : (
        <p className={styles.soon}>Курс у розробці</p>
      )}

      <Authors authors={selectedCourse.authors} />
    </section>
  );
};
