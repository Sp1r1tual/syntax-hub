import { IUser } from "@/common/types";

import { $apiMain } from "@/api";

class UsersService {
  static async getUser() {
    const response = await $apiMain.get<{ user: IUser }>("/users/me");
    return response.data.user;
  }
}

export { UsersService };
