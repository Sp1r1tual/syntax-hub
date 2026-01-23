import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TokenBlacklistService {
  constructor(private readonly prisma: PrismaService) {}

  async addToBlacklist(
    token: string,
    userId: string,
    reason?: string,
  ): Promise<void> {
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await this.prisma.tokenBlacklist.create({
      data: {
        token,
        userId,
        reason,
        expiresAt,
      },
    });
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await this.prisma.tokenBlacklist.findUnique({
      where: { token },
    });

    if (!blacklistedToken) {
      return false;
    }

    if (blacklistedToken.expiresAt < new Date()) {
      await this.prisma.tokenBlacklist.delete({
        where: { id: blacklistedToken.id },
      });
      return false;
    }

    return true;
  }

  async blacklistAllUserTokens(userId: string, reason?: string): Promise<void> {
    const tokens = await this.prisma.refreshToken.findMany({
      where: { userId },
    });

    for (const token of tokens) {
      await this.addToBlacklist(token.token, userId, reason);
    }

    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  async cleanupExpired(): Promise<void> {
    await this.prisma.tokenBlacklist.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
