import { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useNavbarStore } from "@/store/ui/navbarStore";
import { useAuthStore } from "@/store/auth/useAuthStore";

import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { ThemeButton } from "../ui/buttons/ThemeButton";
import { GoogleAuthButton } from "../ui/buttons/GoogleAuthButton";
import { ProfileButton } from "../ui/buttons/ProfileButton";

import { MENU_CONFIG } from "@/common/configs/ui/navbarConfigsMenu";

import NavbarHeaderPng from "@/assets/navbar-header.png";
import BurgerMenuSvg from "@/assets/burger-menu.svg";
import CloseSvg from "@/assets/close.svg";

import styles from "./styles/Navbar.module.css";

export const Navbar = () => {
  const mobileOpen = useNavbarStore((state) => state.mobileOpen);
  const desktopMenus = useNavbarStore((state) => state.desktopMenus);
  const mobileMenus = useNavbarStore((state) => state.mobileMenus);
  const activeMobileSubmenu = useNavbarStore(
    (state) => state.activeMobileSubmenu,
  );
  const { toggleMobile, toggleDesktopMenu, toggleMobileSubmenu, closeMobile } =
    useNavbarStore();

  const { user } = useAuthStore();

  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav id="navbar" className={styles.navbar}>
        <div className={styles.links}>
          <div className={styles.leftSide}>
            <Link to="/" className={styles.logoWrapper}>
              <img
                src={NavbarHeaderPng}
                alt="SyntaxHub"
                className={styles.logo}
              />
            </Link>

            <div className={styles.desktopMenu}>
              {Object.entries(MENU_CONFIG).map(([key, config]) => (
                <DesktopMenu
                  key={key}
                  config={config}
                  isOpen={!!desktopMenus[key]}
                  onToggle={(open) => toggleDesktopMenu(key, open)}
                  isActive={isActive}
                />
              ))}
            </div>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.themeButtonWrapper}>
              <ThemeButton />
            </div>

            {!user ? <GoogleAuthButton /> : <ProfileButton />}

            <button className={styles.burgerBtn} onClick={toggleMobile}>
              <img
                src={mobileOpen ? CloseSvg : BurgerMenuSvg}
                alt={mobileOpen ? "Close menu" : "Open menu"}
                className={styles.mobileMenuImg}
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`${styles.overlay} ${mobileOpen ? styles.visible : ""}`}
        onClick={closeMobile}
        role="button"
      />

      <div
        className={`${styles.mobileMenuWrapper} ${
          mobileOpen ? styles.visible : ""
        }`}
      >
        <MobileMenu
          config={MENU_CONFIG}
          activeSubmenu={activeMobileSubmenu}
          mobileMenus={mobileMenus}
          onToggleSubmenu={toggleMobileSubmenu}
          onClose={closeMobile}
          isActive={isActive}
        />
      </div>

      <div
        className={`${styles.themeTogglerContainer} ${
          mobileOpen ? styles.visible : ""
        }`}
      >
        <ThemeButton />
      </div>
    </>
  );
};
