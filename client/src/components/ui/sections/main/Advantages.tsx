import styles from "./styles/Advantages.module.css";

export const Advantages = () => {
  return (
    <>
      <h2 className={styles.header}>Ми пропонуємо:</h2>
      <section className={styles.advantagesWrapper}>
        <div className={styles.advantagesItem}>
          <h3 className={styles.itemHeader}>Курси</h3>
          <p className={styles.itemText}>
            Структуровані курси з мов програмування, бібліотек і фреймворків -
            від бази до практичного застосування.
          </p>
        </div>

        <div className={styles.advantagesItem}>
          <h3 className={styles.itemHeader}>Дорожні карти</h3>
          <p className={styles.itemText}>
            Чіткі навчальні маршрути без хаосу - що, коли і в якій послідовності
            вивчати для досягнення результату.
          </p>
        </div>

        <div className={styles.advantagesItem}>
          <h3 className={styles.itemHeader}>Зворотній зв&apos;язок</h3>
          <p className={styles.itemText}>
            Живе спілкування з однодумцями: розбір складних тем, допомога з
            кодом і практичні поради від спільноти.
          </p>
        </div>
      </section>
    </>
  );
};
