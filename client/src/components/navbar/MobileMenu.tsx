import { MobileSubmenu } from "./MobileSubmenu";

import { IMenuConfig } from "@/common/types";

import RightArrowSvg from "@/assets/arrow-right.svg";

import styles from "./styles/MobileMenu.module.css";

interface IMobileMenuProps {
  config: Record<string, IMenuConfig>;
  activeSubmenu: string | null;
  mobileMenus: Record<string, boolean>;
  onToggleSubmenu: (menuKey: string | null) => void;
  onClose: () => void;
  isActive: (path: string) => boolean;
}

export const MobileMenu = ({
  config,
  activeSubmenu,
  onToggleSubmenu,
  onClose,
  isActive,
}: IMobileMenuProps) => {
  return (
    <div className={styles.mobileMenu}>
      {!activeSubmenu && (
        <>
          {Object.entries(config).map(([key, menuConfig]) => (
            <button
              key={key}
              className={styles.link}
              onClick={() => onToggleSubmenu(key)}
            >
              {menuConfig.label}
              <img src={RightArrowSvg} alt="open" className={styles.arrow} />
            </button>
          ))}
        </>
      )}

      {activeSubmenu && config[activeSubmenu] && (
        <MobileSubmenu
          config={config[activeSubmenu]}
          onBack={() => onToggleSubmenu(null)}
          onClose={onClose}
          isActive={isActive}
        />
      )}
    </div>
  );
};
