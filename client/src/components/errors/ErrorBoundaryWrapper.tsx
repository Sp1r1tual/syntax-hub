import { useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import styles from "./styles/ErrorBoundaryWrapper.module.css";

interface IErrorBoundaryWrapperProps {
  children: ReactNode;
}

interface IErrorFallbackProps extends FallbackProps {
  onRetry: () => void;
  onGoBack: () => void;
  errorText: string;
  tryAgainText: string;
  goBackText: string;
}

const ErrorFallback = ({
  error,
  resetErrorBoundary,
  onRetry,
  onGoBack,
  errorText,
  tryAgainText,
  goBackText,
}: IErrorFallbackProps) => {
  return (
    <div className={styles.errorWrapper}>
      <div role="alert" className={styles.errorAlert}>
        <p className={styles.errorText}>{errorText}:</p>
        <pre className={styles.errorMessage}>{error?.message}</pre>

        <div className={styles.buttonGroup}>
          <button
            onClick={() => {
              onRetry();
              resetErrorBoundary();
            }}
            className={styles.retryButton}
          >
            {tryAgainText}
          </button>
          <button onClick={onGoBack} className={styles.backButton}>
            {goBackText}
          </button>
        </div>
      </div>
    </div>
  );
};

const ErrorBoundaryWrapper = ({ children }: IErrorBoundaryWrapperProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [resetKey, setResetKey] = useState(0);

  const fallbackRender = (props: FallbackProps) => (
    <ErrorFallback
      {...props}
      onRetry={() => setResetKey((prev) => prev + 1)}
      onGoBack={() => navigate(-1)}
      errorText="Щось пішло не так"
      tryAgainText="Спробувати знову"
      goBackText="Назад"
    />
  );

  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      resetKeys={[resetKey, location.pathname]}
    >
      {children}
    </ErrorBoundary>
  );
};

export { ErrorBoundaryWrapper };
