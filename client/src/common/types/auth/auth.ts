export interface IUser {
  id: string;
  email: string;
  name: string | null;
  avatar?: string;
  roles: Array<{
    role: {
      key: string;
      title: string;
    };
  }>;
}
