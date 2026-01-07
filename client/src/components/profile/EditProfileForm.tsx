import { useState, ChangeEvent, FormEvent } from "react";

import { IUpdateUserProfilePayload } from "@/common/types";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useUserStore } from "@/store/users/useUserStore";

import { CommonButton } from "../ui/buttons/CommonButton";

import { getAvatarUrl } from "@/common/utils/getAvatarUrl";

import defaultAvatarSvg from "@/assets/avatar-default.svg";

import styles from "./styles/EditProfileForm.module.css";

interface IEditProfileFormProps {
  onClose: () => void;
}

export const EditProfileForm = ({ onClose }: IEditProfileFormProps) => {
  const { user } = useAuthStore();
  const { updateProfile, isLoading } = useUserStore();

  const [name, setName] = useState(user?.name ?? "");
  const [nameError, setNameError] = useState("");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(
    getAvatarUrl(user?.avatar),
  );
  const [avatarError, setAvatarError] = useState("");

  const isNameChanged = name !== user?.name;
  const isAvatarChanged = Boolean(avatarFile);

  const hasChanges = isNameChanged || isAvatarChanged;

  const isSaveDisabled =
    !hasChanges || Boolean(nameError) || Boolean(avatarError) || isLoading;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);

    if (value.length < 2 || value.length > 32) {
      setNameError("Допустимий розмір імені 2-32 символи");
    } else {
      setNameError("");
    }
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError("Неправильний формат зображення");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError("Завантажте фото не більше за 5 МБ");
      return;
    }

    setAvatarError("");
    setAvatarFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = defaultAvatarSvg;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (nameError || avatarError) return;

    const payload: IUpdateUserProfilePayload = {};

    if (name !== user?.name) {
      payload.name = name;
    }

    if (avatarFile) {
      payload.avatar = avatarFile;
    }

    if (!Object.keys(payload).length) {
      onClose();
      return;
    }

    await updateProfile(payload);
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.avatarSection}>
        <img
          src={avatarPreview}
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
          onChange={handleAvatarChange}
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

        <p className={`${styles.error} ${nameError ? styles.show : ""}`}>
          {nameError || avatarError}
        </p>
      </div>

      <div className={styles.actions}>
        <CommonButton text="Зберегти" type="submit" disabled={isSaveDisabled} />

        <CommonButton text="Скасувати" onClick={onClose} />
      </div>
    </form>
  );
};
