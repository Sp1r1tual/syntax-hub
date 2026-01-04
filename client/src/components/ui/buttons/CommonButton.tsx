import styles from "./styles/CommonBtn.module.css";

interface ICommonButtonProp {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const CommonButton = ({
  text,
  onClick,
  disabled = false,
  type = "button",
}: ICommonButtonProp) => {
  return (
    <button
      type={type}
      className={styles.commonBtn}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
