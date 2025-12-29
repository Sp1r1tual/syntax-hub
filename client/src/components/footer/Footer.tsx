import { CONTACTS } from "@/common/data/contacts";

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
            Користувацька угода
          </a>
        </div>

        <div className={styles.right}>
          <a className={styles.contact} href={`mailto:${mail}`}>
            Зв&apos;язатися з нами
          </a>

          <div className={styles.copyright}>
            © {new Date().getFullYear()}
            <span className={styles.copyrightText}>
              SyntaxHub - зроблено для прогресу
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
