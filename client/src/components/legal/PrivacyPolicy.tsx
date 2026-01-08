import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CommonButton } from "../ui/buttons/CommonButton";

import styles from "./styles/legal.module.css";

export const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromMainPage = useRef(location.state?.fromMainPage);

  const handleBack = () => {
    if (fromMainPage.current) {
      sessionStorage.setItem("reopenCookieBanner", "true");
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (location.state?.fromMainPage) {
      fromMainPage.current = true;
    }

    return () => {
      if (fromMainPage.current) {
        sessionStorage.setItem("reopenCookieBanner", "true");
      }
    };
  }, [location.state?.fromMainPage]);

  return (
    <article className={styles.terms}>
      <CommonButton onClick={handleBack} text="Повернутися назад" />

      <h1>Політика конфіденційності</h1>

      <section>
        <h2>1. Загальні положення</h2>
        <p>
          Використовуючи цей вебсайт та його освітні матеріали, ви погоджуєтеся
          на збір та обробку даних відповідно до цієї Політики конфіденційності.
          Якщо ви не погоджуєтеся з будь-якою частиною політики – припиніть
          користування сайтом.
        </p>
      </section>

      <section>
        <h2>2. Збір та використання даних</h2>
        <p>Ми можемо збирати та обробляти наступну інформацію:</p>
        <ul>
          <li>
            Дані акаунта (ім&apos;я, email, аватар) для доступу до курсів;
          </li>
          <li>
            Технічні дані про пристрій, IP-адресу та браузер для покращення
            роботи сайту;
          </li>
          <li>
            Інформацію про використання сайту та взаємодію з курсами для
            аналітики та покращення навчального досвіду.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Використання cookie та localStorage</h2>
        <p>
          Сайт використовує cookie для зберігання JWT-токена аутентифікації, що
          забезпечує безпечний вхід у систему. LocalStorage використовується для
          збереження налаштувань інтерфейсу користувача, таких як темна/світла
          тема та стан UI-елементів. Ці дані не передаються третім особам і
          використовуються виключно для роботи сайту та покращення
          користувацького досвіду.
        </p>
      </section>

      <section>
        <h2>4. Захист даних</h2>
        <p>
          Ми вживаємо належних технічних та організаційних заходів для захисту
          ваших даних від несанкціонованого доступу, втрати або пошкодження.
        </p>
      </section>

      <section>
        <h2>5. Передача даних третім особам</h2>
        <p>
          Ми не продаємо і не передаємо ваші персональні дані третім сторонам,
          окрім випадків, коли це необхідно для надання послуг (наприклад,
          платіжні системи) або коли цього вимагає закон.
        </p>
      </section>

      <section>
        <h2>6. Ваші права</h2>
        <p>Ви маєте право:</p>
        <ul>
          <li>Отримати доступ до своїх даних;</li>
          <li>Виправити або видалити особисту інформацію;</li>
          <li>Відмовитися від використання певних даних для аналітики.</li>
        </ul>
      </section>

      <section>
        <h2>7. Зміни політики конфіденційності</h2>
        <p>
          Ми залишаємо за собою право змінювати цю Політику конфіденційності у
          будь-який час. Актуальна версія завжди доступна на цій сторінці.
        </p>
      </section>

      <section>
        <h2>8. Контактна інформація</h2>
        <p>
          Якщо у вас є запитання щодо цієї Політики конфіденційності, ви можете
          зв&apos;язатися з нами через доступні на сайті канали зв&apos;язку.
        </p>
      </section>

      <CommonButton onClick={handleBack} text="Повернутися назад" />
    </article>
  );
};
