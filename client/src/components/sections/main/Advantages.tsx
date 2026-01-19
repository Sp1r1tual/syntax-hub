import { useRevealOnScroll } from "@/hooks/ui/useRevealOnScroll";

import styles from "./styles/Advantages.module.css";

export const Advantages = () => {
  if (!styles.visible) throw new Error("Class visible not found in CSS Module");

  const itemsRef = useRevealOnScroll(styles.visible);

  const advantagesData = [
    {
      id: "courses",
      title: "Курси",
      text: "Структуровані курси з мов програмування, бібліотек і фреймворків - від бази до практичного застосування.",
    },
    {
      id: "roadmaps",
      title: "Дорожні карти",
      text: "Чіткі навчальні маршрути без хаосу - що, коли і в якій послідовності вивчати для досягнення результату.",
    },
    {
      id: "feedback",
      title: "Зворотній зв'язок",
      text: "Живе спілкування з однодумцями: розбір складних тем, допомога з кодом і практичні поради від спільноти.",
    },
  ];

  return (
    <>
      <h2 className={styles.header}>Ми пропонуємо:</h2>
      <section className={styles.advantagesWrapper}>
        {advantagesData.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) itemsRef.current[idx] = el;
            }}
            className={styles.advantagesItem}
          >
            <h3 className={styles.itemHeader}>{item.title}</h3>
            <p className={styles.itemText}>{item.text}</p>
          </div>
        ))}
      </section>
    </>
  );
};
