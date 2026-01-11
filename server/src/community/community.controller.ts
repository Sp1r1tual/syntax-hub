import { Controller, Get, Req, UseGuards, Patch, Param } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";

import type { IRequestWithUser } from "src/common/types";

import { JwtAuthGuard } from "src/auth/guards/index";
import { GetUserId } from "src/auth/decorators/get-user-id.decorator";

import { CommunityService } from "./community.service";

@Controller("community")
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get("news")
  async getNews(@Req() req: IRequestWithUser) {
    const userId = req.user?.userId;

    return this.communityService.getNews(userId);
  }

  @Patch("news/:newsId")
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async like(@GetUserId() userId: string, @Param("newsId") newsId: string) {
    return this.communityService.toggleLike(newsId, userId);
  }
}
