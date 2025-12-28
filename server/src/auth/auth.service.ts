import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { randomBytes } from "crypto";

import { IGoogleProfile } from "./types/auth";

import { UsersService } from "src/user/users.service";
import { PrismaService } from "src/prisma/prisma.service";

import {
  ValidateOAuthDto,
  AuthResponseDto,
  RefreshTokenResponseDto,
} from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateOAuthLogin(profile: IGoogleProfile): Promise<AuthResponseDto> {
    const dto: ValidateOAuthDto = {
      email: profile.emails[0].value,
      name: profile.displayName,
    };

    const user = await this.usersService.upsertFromOAuth(dto);

    const accessToken = this.createAccessToken(
      user.id,
      user.roles.map((r) => r.role.key),
    );
    const refreshToken = await this.createRefreshToken(user.id);

    return { user, accessToken, refreshToken };
  }

  createAccessToken(userId: string, roles: string[]): string {
    return this.jwtService.sign({ sub: userId, roles });
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
    const dbToken = await this.prisma.refreshToken.findUnique({
      where: { token: oldToken },
      include: { user: { include: { roles: { include: { role: true } } } } },
    });

    if (!dbToken || dbToken.expiresAt < new Date()) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    const accessToken = this.createAccessToken(
      dbToken.user.id,
      dbToken.user.roles.map((r) => r.role.key),
    );

    return { accessToken };
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({ where: { token } });
  }
}
