import { ISocials } from "@/common/types";

import styles from "./styles/EditSocials.module.css";

interface ISocialsErrors {
  githubUrl: string;
  telegramUrl: string;
  instagramUrl: string;
}

interface IEditSocialsProps {
  socials: ISocials;
  errors?: ISocialsErrors;
  disabled?: boolean;
  onChange: (updated: ISocials) => void;
}

export const EditSocials = ({
  socials,
  errors,
  onChange,
  disabled,
}: IEditSocialsProps) => {
  const handleInputChange = (key: keyof ISocials, value: string) => {
    onChange({ ...socials, [key]: value || "" });
  };

  return (
    <>
      <div className={styles.fieldGroup}>
        <label htmlFor="github" className={styles.label}>
          GitHub
        </label>
        <input
          id="github"
          type="url"
          value={socials.githubUrl || ""}
          placeholder="https://github.com/username"
          onChange={(event) =>
            handleInputChange("githubUrl", event.target.value)
          }
          disabled={disabled}
          className={`${styles.input} ${errors?.githubUrl ? styles.inputError : ""}`}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="telegram" className={styles.label}>
          Telegram
        </label>
        <input
          id="telegram"
          type="url"
          value={socials.telegramUrl || ""}
          placeholder="https://t.me/username"
          onChange={(event) =>
            handleInputChange("telegramUrl", event.target.value)
          }
          disabled={disabled}
          className={`${styles.input} ${errors?.telegramUrl ? styles.inputError : ""}`}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="instagram" className={styles.label}>
          Instagram
        </label>
        <input
          id="instagram"
          type="url"
          value={socials.instagramUrl || ""}
          placeholder="https://instagram.com/username"
          onChange={(event) =>
            handleInputChange("instagramUrl", event.target.value)
          }
          disabled={disabled}
          className={`${styles.input} ${errors?.instagramUrl ? styles.inputError : ""}`}
        />
      </div>
    </>
  );
};
