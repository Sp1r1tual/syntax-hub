import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

import styles from "./styles/RouteErrorFallback.module.css";

const RouteErrorFallback = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let message;

  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = "Невідома помилка";
  }

  return (
    <div className={styles.errorWrapper}>
      <div role="alert" className={styles.errorAlert}>
        <p className={styles.errorText}>Щось пішло не так:</p>
        <pre className={styles.errorMessage}>{message}</pre>

        <div className={styles.buttonGroup}>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Спробувати знову
          </button>

          <button onClick={() => navigate(-1)} className={styles.backButton}>
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export { RouteErrorFallback };
