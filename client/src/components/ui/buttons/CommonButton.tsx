import styles from "./styles/CommonBtn.module.css";

interface ICommonButtonProp {
  text: string;
  onClick: () => void;
}

export const CommonButton = ({ text, onClick }: ICommonButtonProp) => {
  return (
    <button className={styles.commonBtn} onClick={onClick}>
      {text}
    </button>
  );
};
