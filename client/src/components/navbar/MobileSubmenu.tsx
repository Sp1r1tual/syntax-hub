import { Link } from "react-router-dom";

import { IMenuConfig } from "@/common/types";

import RightArrowSvg from "@/assets/arrow-right.svg";

import styles from "./styles/MobileSubmenu.module.css";

interface IMobileSubmenuProps {
  config: IMenuConfig;
  onBack: () => void;
  onClose: () => void;
  isActive: (path: string) => boolean;
}

export const MobileSubmenu = ({
  config,
  onBack,
  onClose,
  isActive,
}: IMobileSubmenuProps) => {
  return (
    <div className={styles.mobileSubmenu}>
      <button className={styles.mobileBackBtn} onClick={onBack}>
        <img
          src={RightArrowSvg}
          alt=""
          className={`${styles.arrow} ${styles.arrowBack}`}
        />
        Назад
      </button>
      {config.items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`${styles.dropdownItem} ${
            isActive(item.path) ? styles.active : ""
          }`}
          onClick={onClose}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};
