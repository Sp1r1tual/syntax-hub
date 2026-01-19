import { IUser } from "../auth/auth";

export interface ISocials {
  telegramUrl?: string | undefined;
  githubUrl?: string | undefined;
  instagramUrl?: string | undefined;
}

export interface IUpdateUserProfilePayload {
  name?: string;
  avatar?: File;
  socials?: ISocials;
}

export type PublicUserType = Omit<IUser, "roles" | "email">;
