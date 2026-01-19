import { FormEvent } from "react";

import { useProfileForm } from "@/hooks/ui/useProfileForm";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useUserStore } from "@/store/users/useUserStore";

import { CommonButton } from "../ui/buttons/CommonButton";
import { EditSocials } from "./EditSocials";

import { getAvatarUrl } from "@/common/utils/getAvatarUrl";

import defaultAvatarSvg from "@/assets/avatar-default.svg";

import styles from "./styles/EditProfileForm.module.css";

interface IEditProfileFormProps {
  onClose: () => void;
}

export const EditProfileForm = ({ onClose }: IEditProfileFormProps) => {
  const { user } = useAuthStore();
  const { updateProfile, isLoading } = useUserStore();

  const {
    name,
    nameError,
    avatarPreview,
    avatarError,
    socialsErrorMessage,
    socials,
    socialsError,
    handleNameChange,
    handleAvatarChange,
    handleSocialsChange,
    isSaveDisabled,
    buildPayload,
  } = useProfileForm(user);

  const handleAvatarError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = defaultAvatarSvg;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (
      nameError ||
      avatarError ||
      socialsError.githubUrl ||
      socialsError.telegramUrl ||
      socialsError.instagramUrl
    ) {
      return;
    }

    const payload = buildPayload();

    if (!Object.keys(payload).length) {
      onClose();
      return;
    }

    await updateProfile(payload);
    onClose();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleAvatarChange(file);
    }
  };

  const hasError = Boolean(nameError || avatarError || socialsErrorMessage);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.avatarSection}>
        <img
          src={avatarPreview || getAvatarUrl(user?.avatar)}
          alt="Аватар"
          className={styles.avatar}
          loading="lazy"
          onError={handleAvatarError}
        />

        <button
          type="button"
          className={styles.changeAvatarBtn}
          onClick={() => document.getElementById("avatarInput")?.click()}
        >
          Змінити аватар
        </button>

        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className={styles.avatarInput}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="name" className={styles.label}>
          Ім&apos;я
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          className={`${styles.input} ${nameError ? styles.inputError : ""}`}
          maxLength={32}
          disabled={isLoading}
          autoComplete="name"
        />

        <EditSocials
          socials={socials}
          errors={socialsError}
          onChange={handleSocialsChange}
          disabled={isLoading}
        />

        <div className={`${styles.error} ${hasError ? styles.show : ""}`}>
          {(nameError || avatarError) && <p>{nameError || avatarError}</p>}
          {socialsErrorMessage && <p>{socialsErrorMessage}</p>}
        </div>
      </div>

      <div className={styles.actions}>
        <CommonButton
          text="Зберегти"
          type="submit"
          disabled={isSaveDisabled || isLoading}
        />

        <CommonButton text="Скасувати" onClick={onClose} />
      </div>
    </form>
  );
};
