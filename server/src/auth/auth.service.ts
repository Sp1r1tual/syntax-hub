import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { randomBytes } from "crypto";

import type { UserRole } from "@prisma/client";
import type { GoogleProfileType } from "./types/auth";
import { RefreshTokenResponseDto, GoogleAuthUserDto } from "./dto/index";

import { UsersService } from "src/user/users.service";
import { PrismaService } from "src/prisma/prisma.service";
import { TokenBlacklistService } from "./token-blacklist.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  async validateOAuthLogin(
    profile: GoogleProfileType,
  ): Promise<GoogleAuthUserDto> {
    const user = await this.usersService.upsertFromOAuth({
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos?.[0]?.value || undefined,
    });

    await this.cleanupUserTokens(user.id);

    const accessToken = this.createAccessToken(user.id, user.role as UserRole);
    const refreshToken = await this.createRefreshToken(user.id);

    return GoogleAuthUserDto.create({
      ...user,
      accessToken,
      refreshToken,
    });
  }

  createAccessToken(userId: string, role: UserRole): string {
    return this.jwtService.sign({ userId, role }, { expiresIn: "15m" });
  }

  async createRefreshToken(userId: string): Promise<string> {
    const token = randomBytes(64).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await this.prisma.refreshToken.create({
      data: { token, userId, expiresAt },
    });

    return token;
  }

  async refreshToken(oldToken: string): Promise<RefreshTokenResponseDto> {
    const isBlacklisted =
      await this.tokenBlacklistService.isBlacklisted(oldToken);

    if (isBlacklisted) {
      throw new UnauthorizedException("Token has been revoked");
    }

    const dbToken = await this.prisma.refreshToken.findUnique({
      where: { token: oldToken },
      include: { user: true },
    });

    if (!dbToken || dbToken.expiresAt < new Date()) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    if (dbToken.user.isBanned) {
      throw new ForbiddenException("Your account has been banned");
    }

    await this.prisma.refreshToken.delete({ where: { id: dbToken.id } });
    await this.cleanupExpiredTokens(dbToken.user.id);

    const newRefreshToken = await this.createRefreshToken(dbToken.user.id);
    const accessToken = this.createAccessToken(
      dbToken.user.id,
      dbToken.user.role,
    );

    return RefreshTokenResponseDto.create({
      accessToken,
      refreshToken: newRefreshToken,
    });
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({ where: { token } });
  }

  async cleanupUserTokens(userId: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  async cleanupExpiredTokens(userId: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId,
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
