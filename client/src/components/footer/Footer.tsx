import { CONTACTS } from "@/data/contacts";

import styles from "./styles/Footer.module.css";

export const Footer = () => {
  const mail = CONTACTS.email;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linkGroup}>
          <a
            className={styles.footerLink}
            href="https://github.com/Sp1r1tual/pixel-place-client"
            target="_blank"
            rel="noopener noreferrer"
          >
            Про проєкт
          </a>

          <a className={styles.footerLink} href="/">
            Угода користувача
          </a>
        </div>

        <div className={styles.right}>
          <a className={styles.contact} href={`mailto:${mail}`}>
            Зв&apos;язатися зі мною
          </a>

          <div className={styles.copyright}>
            © {new Date().getFullYear()}
            <span className={styles.copyrightText}>
              SyntaxHub - made for progress
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
