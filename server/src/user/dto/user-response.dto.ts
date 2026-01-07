import { Expose } from "class-transformer";
import type { UserRole } from "@prisma/client";

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
  role: UserRole;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
