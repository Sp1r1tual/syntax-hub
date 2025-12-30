import { IUser } from "@/common/types";

import { $apiMain } from "@/api";

export class UsersService {
  static async getUser() {
    const response = await $apiMain.get<{ user: IUser }>("/users/me");
    return response.data.user;
  }
}
