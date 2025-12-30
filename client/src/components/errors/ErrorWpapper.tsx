import styles from "./styles/ErrorWrapper.module.css";

interface IErrorWrapperProps {
  error: string;
}

export const ErrorWrapper = ({ error }: IErrorWrapperProps) => {
  return (
    <section className={styles.errorWrapper}>
      <p className={styles.error}>{error}</p>
    </section>
  );
};
