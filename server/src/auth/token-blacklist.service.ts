import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class TokenBlacklistService {
  private readonly BLACKLIST_PREFIX = "blacklist:";

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

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

    const ttlSeconds = 30 * 24 * 60 * 60;
    const redis = this.redisService.getRedis();

    await redis.setex(
      `${this.BLACKLIST_PREFIX}${token}`,
      ttlSeconds,
      JSON.stringify({ userId, reason, expiresAt: expiresAt.toISOString() }),
    );
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const redis = this.redisService.getRedis();

    const cachedValue = await redis.get(`${this.BLACKLIST_PREFIX}${token}`);

    if (cachedValue !== null) {
      return true;
    }

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

    const remainingTtl = Math.floor(
      (blacklistedToken.expiresAt.getTime() - Date.now()) / 1000,
    );

    if (remainingTtl > 0) {
      await redis.setex(
        `${this.BLACKLIST_PREFIX}${token}`,
        remainingTtl,
        JSON.stringify({
          userId: blacklistedToken.userId,
          reason: blacklistedToken.reason,
          expiresAt: blacklistedToken.expiresAt.toISOString(),
        }),
      );
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

  async removeFromBlacklist(token: string): Promise<void> {
    const redis = this.redisService.getRedis();

    await this.prisma.tokenBlacklist.deleteMany({
      where: { token },
    });
    await redis.del(`${this.BLACKLIST_PREFIX}${token}`);
  }
}
