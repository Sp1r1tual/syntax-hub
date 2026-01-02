import arrowSvg from "@/assets/arrow-right.svg";

import styles from "./styles/PrevNextButtons.module.css";

interface PrevNextButtonsProps {
  textBack: string;
  textNext: string;
  onPrev?: () => void;
  onNext?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

export const PrevNextButtons = ({
  textBack,
  textNext,
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
}: PrevNextButtonsProps) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onPrev} disabled={disablePrev}>
        <img src={arrowSvg} alt="Назад" className={styles.backImg} />
        {textBack}
      </button>
      <button className={styles.button} onClick={onNext} disabled={disableNext}>
        {textNext}
        <img src={arrowSvg} alt="Вперед" className={styles.nextImg} />
      </button>
    </div>
  );
};
