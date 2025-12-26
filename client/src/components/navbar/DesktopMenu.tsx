import { Link } from "react-router-dom";

import { IMenuConfig } from "@/types";

import DownArrowSvg from "@/assets/down-arrow.svg";

import styles from "./styles/DesktopMenu.module.css";

interface IDesktopMenuProps {
  config: IMenuConfig;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  isActive: (path: string) => boolean;
}

export const DesktopMenu = ({
  config,
  isOpen,
  onToggle,
  isActive,
}: IDesktopMenuProps) => {
  return (
    <div
      className={styles.dropdownWrapper}
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <button
        className={styles.link}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {config.label}
        <img src={DownArrowSvg} alt="open" className={styles.arrow} />
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {config.items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.dropdownItem} ${
                isActive(item.path) ? styles.active : ""
              }`}
              onClick={() => onToggle(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
