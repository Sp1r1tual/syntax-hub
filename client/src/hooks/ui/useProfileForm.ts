import { useState, ChangeEvent } from "react";

import { IUpdateUserProfilePayload, ISocials, IUser } from "@/common/types";

export const useProfileForm = (user: IUser | null) => {
  const [name, setName] = useState(user?.name ?? "");
  const [nameError, setNameError] = useState("");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarError, setAvatarError] = useState("");

  const [socials, setSocials] = useState<ISocials>({
    githubUrl: user?.socials?.githubUrl ?? "",
    telegramUrl: user?.socials?.telegramUrl ?? "",
    instagramUrl: user?.socials?.instagramUrl ?? "",
  });

  const [socialsError, setSocialsError] = useState({
    githubUrl: "",
    telegramUrl: "",
    instagramUrl: "",
  });

  const validateName = (value: string): string => {
    if (value.length < 2 || value.length > 32) {
      return "Допустимий розмір імені 2-32 символи";
    }
    return "";
  };

  const validateUrl = (value: string): string => {
    if (value && !/^https?:\/\/.+/.test(value)) {
      return "Невірний URL";
    }
    return "";
  };

  const validateAvatarFile = (file: File): string => {
    if (!file.type.startsWith("image/")) {
      return "Неправильний формат зображення";
    }
    if (file.size > 5 * 1024 * 1024) {
      return "Завантажте фото не більше за 5 МБ";
    }
    return "";
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    setNameError(validateName(value));
  };

  const handleAvatarChange = (file: File) => {
    const error = validateAvatarFile(file);

    if (error) {
      setAvatarError(error);
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

  const handleSocialsChange = (updated: ISocials) => {
    setSocials(updated);

    const newErrors = {
      githubUrl: validateUrl(updated.githubUrl || ""),
      telegramUrl: validateUrl(updated.telegramUrl || ""),
      instagramUrl: validateUrl(updated.instagramUrl || ""),
    };

    setSocialsError(newErrors);
  };

  const socialsErrorMessage = Object.values(socialsError).find(Boolean) || "";

  const isNameChanged = name !== user?.name;
  const isAvatarChanged = Boolean(avatarFile);
  const isSocialsChanged =
    socials.githubUrl !== (user?.socials?.githubUrl ?? "") ||
    socials.telegramUrl !== (user?.socials?.telegramUrl ?? "") ||
    socials.instagramUrl !== (user?.socials?.instagramUrl ?? "");

  const hasChanges = isNameChanged || isAvatarChanged || isSocialsChanged;

  const hasAnySocialsError =
    Boolean(socialsError.githubUrl) ||
    Boolean(socialsError.telegramUrl) ||
    Boolean(socialsError.instagramUrl);

  const isSaveDisabled =
    !hasChanges ||
    Boolean(nameError) ||
    Boolean(avatarError) ||
    hasAnySocialsError;

  const buildPayload = (): IUpdateUserProfilePayload => {
    const payload: IUpdateUserProfilePayload = {};

    if (name !== user?.name) {
      payload.name = name;
    }

    if (avatarFile) {
      payload.avatar = avatarFile;
    }

    if (isSocialsChanged) {
      payload.socials = {
        githubUrl: socials.githubUrl || undefined,
        telegramUrl: socials.telegramUrl || undefined,
        instagramUrl: socials.instagramUrl || undefined,
      };
    }

    return payload;
  };

  return {
    name,
    nameError,
    socialsErrorMessage,
    avatarFile,
    avatarPreview,
    avatarError,
    socials,
    socialsError,
    handleNameChange,
    handleAvatarChange,
    handleSocialsChange,
    hasChanges,
    isSaveDisabled,
    buildPayload,
  };
};
