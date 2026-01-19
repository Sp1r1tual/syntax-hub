import { IUser, IUpdateUserProfilePayload } from "@/common/types";

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

    return $apiMain.patch<IUser>("users/me/update", formData);
  }
}
