import { useState } from "react";
import { Link } from "react-router-dom";

import NavbarHeaderPng from "@/assets/navbar-header.png";
import DownArrowSvg from "@/assets/down-arrow.svg";
import LightModeSvg from "@/assets/light-mode.svg";
// import DarkModeSvg from "@/assets/dark-mode.svg";
import GoogleLogoPng from "@/assets/google-logo.png";
import BurgerMenuSvg from "@/assets/burger-menu.svg";
import CloseSvg from "@/assets/close.svg";
import RightArrowSvg from "@/assets/arrow-right.svg";

import styles from "./styles/Navbar.module.css";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  return (
    <>
      <nav className={styles.navbar}>
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
              <button className={styles.link}>
                Навчання
                <img src={DownArrowSvg} alt="" className={styles.arrow} />
              </button>
              <button className={styles.link}>
                Спільнота
                <img src={DownArrowSvg} alt="" className={styles.arrow} />
              </button>
            </div>
          </div>

          <div className={styles.rightSide}>
            <button className={styles.themeToggler}>
              <img
                src={LightModeSvg}
                alt=""
                className={styles.themeTogglerImg}
              />
            </button>

            <button className={styles.authBtn}>
              <img src={GoogleLogoPng} alt="" className={styles.authBtnImg} />
              <span className={styles.authBtnText}>Увійти</span>
            </button>

            <button className={styles.burgerBtn} onClick={toggleMobileMenu}>
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
        className={`${styles.mobileMenuWrapper} ${
          mobileOpen ? styles.visible : ""
        }`}
      >
        <div className={styles.mobileMenu}>
          <button className={styles.link}>
            Навчання
            <img src={RightArrowSvg} alt="" className={styles.arrow} />
          </button>
          <button className={styles.link}>
            Спільнота
            <img src={RightArrowSvg} alt="" className={styles.arrow} />
          </button>
        </div>
      </div>

      <div
        className={`${styles.themeTogglerContainer} ${
          mobileOpen ? styles.visible : ""
        }`}
      >
        <button className={styles.themeToggler}>
          <img src={LightModeSvg} alt="" className={styles.themeTogglerImg} />
        </button>
      </div>
    </>
  );
};
