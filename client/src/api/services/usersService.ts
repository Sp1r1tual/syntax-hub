import {
  IUser,
  IUpdateUserProfilePayload,
  PublicUserType,
} from "@/common/types";

import { $apiMain } from "@/api";

export class UsersService {
  static async getUser() {
    const response = await $apiMain.get<{ user: IUser }>("/users/me");

    return response.data.user;
  }

  static changeProfileInfo(data: IUpdateUserProfilePayload) {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.avatar) formData.append("avatar", data.avatar);
    if (data.socials) {
      formData.append("socials", JSON.stringify(data.socials));
    }

    return $apiMain.patch<{ updatedProfile: IUser }>(
      "users/me/update",
      formData,
    );
  }

  static async getPublicUser(userId: string) {
    const response = await $apiMain.get<{ user: PublicUserType }>(
      `/users/${userId}`,
    );

    return response.data.user;
  }
}
