class RoleDto {
  key: string;
  title: string;
}

class UserRoleDto {
  role: RoleDto;
}

export class UserResponseDto {
  id: string;
  email: string;
  name: string | null;
  roles: UserRoleDto[];
  createdAt: Date;
  updatedAt: Date;
}
