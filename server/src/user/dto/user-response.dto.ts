import { Expose, Type } from "class-transformer";

class RoleDto {
  @Expose()
  key: string;

  @Expose()
  title: string;
}

class UserRoleDto {
  @Expose()
  @Type(() => RoleDto)
  role: RoleDto;
}

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string | null;

  @Expose()
  avatar: string | null;

  @Expose()
  @Type(() => UserRoleDto)
  roles: UserRoleDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
