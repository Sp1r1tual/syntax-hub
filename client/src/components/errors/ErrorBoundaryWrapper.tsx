import { useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import styles from "./styles/ErrorBoundaryWrapper.module.css";

interface IErrorBoundaryWrapperProps {
  children: ReactNode;
}

const ErrorBoundaryWrapper = ({ children }: IErrorBoundaryWrapperProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [resetKey, setResetKey] = useState(0);

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }: FallbackProps) => (
        <div className={styles.errorWrapper}>
          <div role="alert" className={styles.errorAlert}>
            <p className={styles.errorText}>Щось пішло не так:</p>
            <pre className={styles.errorMessage}>{error?.message}</pre>

            <div className={styles.buttonGroup}>
              <button
                onClick={() => {
                  setResetKey((prev) => prev + 1);
                  resetErrorBoundary();
                }}
                className={styles.retryButton}
              >
                Спробувати знову
              </button>
              <button
                onClick={() => navigate(-1)}
                className={styles.backButton}
              >
                Назад
              </button>
            </div>
          </div>
        </div>
      )}
      resetKeys={[resetKey, location.pathname]}
    >
      {children}
    </ErrorBoundary>
  );
};

export { ErrorBoundaryWrapper };
