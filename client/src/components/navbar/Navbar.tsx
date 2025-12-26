import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAuthModalStore } from "@/store/modal/useAuthModalStore";

import { ThemeButton } from "../ui/buttons/ThemeButton";

import NavbarHeaderPng from "@/assets/navbar-header.png";
import DownArrowSvg from "@/assets/down-arrow.svg";
import GoogleLogoPng from "@/assets/google-logo.png";
import BurgerMenuSvg from "@/assets/burger-menu.svg";
import CloseSvg from "@/assets/close.svg";
import RightArrowSvg from "@/assets/arrow-right.svg";

import styles from "./styles/Navbar.module.css";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [mobileLearningOpen, setMobileLearningOpen] = useState(false);
  const [mobileCommunityOpen, setMobileCommunityOpen] = useState(false);

  const location = useLocation();

  const { openAuthModal } = useAuthModalStore();

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
    setMobileLearningOpen(false);
    setMobileCommunityOpen(false);
  };

  const toggleMobileLearning = () => {
    setMobileLearningOpen((prev) => !prev);
    setMobileCommunityOpen(false);
  };

  const toggleMobileCommunity = () => {
    setMobileCommunityOpen((prev) => !prev);
    setMobileLearningOpen(false);
  };

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
              <div
                className={styles.dropdownWrapper}
                onMouseEnter={() => setLearningOpen(true)}
                onMouseLeave={() => setLearningOpen(false)}
              >
                <button
                  className={styles.link}
                  onClick={() => setLearningOpen((prev) => !prev)}
                >
                  Навчання
                  <img src={DownArrowSvg} alt="" className={styles.arrow} />
                </button>
                {learningOpen && (
                  <div className={styles.dropdown}>
                    <Link
                      to="/courses"
                      className={`${styles.dropdownItem} ${isActive("/courses") ? styles.active : ""}`}
                      onClick={() => setLearningOpen(false)}
                    >
                      Курси
                    </Link>
                    <Link
                      to="/roadmaps"
                      className={`${styles.dropdownItem} ${isActive("/roadmaps") ? styles.active : ""}`}
                      onClick={() => setLearningOpen(false)}
                    >
                      Роадмапи
                    </Link>
                  </div>
                )}
              </div>

              <div
                className={styles.dropdownWrapper}
                onMouseEnter={() => setCommunityOpen(true)}
                onMouseLeave={() => setCommunityOpen(false)}
              >
                <button
                  className={styles.link}
                  onClick={() => setCommunityOpen((prev) => !prev)}
                >
                  Спільнота
                  <img src={DownArrowSvg} alt="" className={styles.arrow} />
                </button>
                {communityOpen && (
                  <div className={styles.dropdown}>
                    <Link
                      to="/forum"
                      className={`${styles.dropdownItem} ${isActive("/forum") ? styles.active : ""}`}
                      onClick={() => setCommunityOpen(false)}
                    >
                      Форум
                    </Link>
                    <Link
                      to="/news"
                      className={`${styles.dropdownItem} ${isActive("/news") ? styles.active : ""}`}
                      onClick={() => setCommunityOpen(false)}
                    >
                      Новини
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.themeButtonWrapper}>
              <ThemeButton />
            </div>

            <button className={styles.authBtn} onClick={openAuthModal}>
              <img
                src={GoogleLogoPng}
                alt="Google logo"
                className={styles.authBtnImg}
              />
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
        className={`${styles.overlay} ${mobileOpen ? styles.visible : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={`${styles.mobileMenuWrapper} ${
          mobileOpen ? styles.visible : ""
        }`}
      >
        <div className={styles.mobileMenu}>
          {!mobileLearningOpen && !mobileCommunityOpen && (
            <>
              <button className={styles.link} onClick={toggleMobileLearning}>
                Навчання
                <img src={RightArrowSvg} alt="" className={styles.arrow} />
              </button>
              <button className={styles.link} onClick={toggleMobileCommunity}>
                Спільнота
                <img src={RightArrowSvg} alt="" className={styles.arrow} />
              </button>
            </>
          )}

          {mobileLearningOpen && (
            <div className={styles.mobileSubmenu}>
              <button
                className={styles.mobileBackBtn}
                onClick={() => setMobileLearningOpen(false)}
              >
                <img
                  src={RightArrowSvg}
                  alt=""
                  className={`${styles.arrow} ${styles.arrowBack}`}
                />
                Назад
              </button>
              <Link
                to="/courses"
                className={`${styles.dropdownItem} ${isActive("/courses") ? styles.active : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Курси
              </Link>

              <Link
                to="/roadmaps"
                className={`${styles.dropdownItem} ${isActive("/roadmaps") ? styles.active : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Роадмапи
              </Link>
            </div>
          )}

          {mobileCommunityOpen && (
            <div className={styles.mobileSubmenu}>
              <button
                className={styles.mobileBackBtn}
                onClick={() => setMobileCommunityOpen(false)}
              >
                <img
                  src={RightArrowSvg}
                  alt=""
                  className={`${styles.arrow} ${styles.arrowBack}`}
                />
                Назад
              </button>
              <Link
                to="/forum"
                className={`${styles.dropdownItem} ${isActive("/forum") ? styles.active : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Форум
              </Link>
              <Link
                to="/news"
                className={`${styles.dropdownItem} ${isActive("/news") ? styles.active : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Новини
              </Link>
            </div>
          )}
        </div>
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
