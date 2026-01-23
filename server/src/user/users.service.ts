import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import z from "zod";

import { PrismaService } from "../prisma/prisma.service";
import { TokenBlacklistService } from "src/auth/token-blacklist.service";

import {
  CreateUserOAuthDto,
  UpdateUserProfileDto,
  UserResponseDto,
  PublicUserResponseDto,
  BanUserDto,
} from "./dto/index";
import { UpdateUserProfileSchema } from "./schemas/users.schemas";

import { deleteOldAvatarIfNeeded } from "./utils/delete-old-user-avatar";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  private async findByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? UserResponseDto.create(user) : null;
  }

  async findById(id: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? UserResponseDto.create(user) : null;
  }

  async upsertFromOAuth(dto: CreateUserOAuthDto): Promise<UserResponseDto> {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) {
      if (existingUser.isBanned) {
        throw new ForbiddenException("Your account has been banned");
      }
      return existingUser;
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        avatar: dto.avatar,
        role: "USER",
      },
    });

    return UserResponseDto.create(user);
  }

  async updateProfile(
    userId: string,
    updates: UpdateUserProfileDto,
  ): Promise<UserResponseDto> {
    const current = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        avatar: true,
        socials: true,
        role: true,
        isBanned: true,
      },
    });

    if (!current) {
      throw new NotFoundException("User not found");
    }

    if (current.isBanned) {
      throw new ForbiddenException("Your account has been banned");
    }

    if (
      updates.avatar &&
      current.avatar &&
      current.avatar.includes("res.cloudinary.com")
    ) {
      await deleteOldAvatarIfNeeded(current.avatar, updates.avatar);
    }

    const updateData: z.infer<typeof UpdateUserProfileSchema> = {};

    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.avatar !== undefined) updateData.avatar = updates.avatar;
    if (updates.socials !== undefined) updateData.socials = updates.socials;

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return UserResponseDto.create(updatedUser);
  }

  async getPublicUser(userId: string): Promise<PublicUserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return PublicUserResponseDto.create({
      ...user,
      socials: user.socials || undefined,
    });
  }

  async banUser(userId: string, dto: BanUserDto): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.isBanned) {
      throw new ForbiddenException("User is already banned");
    }

    const bannedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        isBanned: true,
        bannedAt: new Date(),
        bannedReason: dto.reason,
      },
    });

    await this.tokenBlacklistService.blacklistAllUserTokens(
      userId,
      dto.reason || "User banned",
    );

    return UserResponseDto.create(bannedUser);
  }

  async unbanUser(
    userId: string,
    newRole: "USER" | "TEACHER" = "USER",
  ): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!user.isBanned) {
      throw new ForbiddenException("User is not banned");
    }

    const unbannedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        isBanned: false,
        bannedAt: null,
        bannedReason: null,
        role: newRole,
      },
    });

    return UserResponseDto.create(unbannedUser);
  }
}
