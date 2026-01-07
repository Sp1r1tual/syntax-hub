import { Injectable, NotFoundException } from "@nestjs/common";

import { IUpdateUserProfilePayload } from "./types";
import { CreateUserOAuthDto, UserResponseDto } from "./dto";

import { PrismaService } from "../prisma/prisma.service";

import { deleteOldAvatarIfNeeded } from "./utils/delete-old-user-avatar";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private async findByEmail(email: string): Promise<UserResponseDto | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<UserResponseDto | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async upsertFromOAuth(dto: CreateUserOAuthDto): Promise<UserResponseDto> {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) {
      return existingUser;
    }

    return this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        avatar: dto.avatar,
        role: "USER",
      },
    });
  }

  async updateProfile(
    userId: string,
    updates: IUpdateUserProfilePayload,
  ): Promise<UserResponseDto> {
    const current = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, avatar: true },
    });

    if (!current) {
      throw new NotFoundException("User not found");
    }

    if (
      updates.avatar &&
      current.avatar &&
      current.avatar.includes("res.cloudinary.com")
    ) {
      await deleteOldAvatarIfNeeded(current.avatar, updates.avatar);
    }

    const updateData: Record<string, string | null> = {};

    if (updates.name !== undefined) {
      updateData.name = updates.name;
    }

    if (updates.avatar !== undefined) {
      updateData.avatar = updates.avatar;
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }
}
