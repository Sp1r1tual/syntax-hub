import styles from "./styles/RoadmapSection.module.css";

interface IRoadmapSectionProps {
  courseName: string;
  onOpenRoadmap?: () => void;
}

export const RoadmapSection = ({
  courseName,
  onOpenRoadmap,
}: IRoadmapSectionProps) => {
  return (
    <>
      <h3 className={styles.topicsHeader}>Дорожня карта</h3>

      <div className={styles.roadmapIntro}>
        <p>
          Дорожні карти допомагають структурувати процес навчання та бачити
          повну картину курсу. Вони покажуть, з чого почати, які теми вивчати
          далі і як закріплювати знання за допомогою практичних запитань.
          Використовуючи дорожні карти, ви зможете впевнено рухатися від
          базового рівня до складніших тем, не пропускаючи важливі кроки.
        </p>

        <button className={styles.openRoadmapBtn} onClick={onOpenRoadmap}>
          Відкрити дорожню карту по {courseName}
        </button>
      </div>
    </>
  );
};
