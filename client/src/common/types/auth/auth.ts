import { ISocials } from "../users/users";

export interface IUser {
  id: string;
  email: string;
  name: string | null;
  avatar?: string;
  socials?: ISocials | undefined;
  roles: Array<{
    role: {
      key: string;
      title: string;
    };
  }>;
}
