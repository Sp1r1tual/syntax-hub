import { Controller, Get, UseGuards, Patch, Param } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";

import { JwtAuthGuard } from "src/auth/guards/index";
import { GetUserId } from "src/auth/decorators";

import { CommunityService } from "./community.service";

@Controller("community")
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get("news")
  async getNews(@GetUserId(true) userId: string | undefined) {
    return this.communityService.getNews(userId);
  }

  @Patch("news/:newsId")
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UseGuards(JwtAuthGuard)
  async like(@GetUserId() userId: string, @Param("newsId") newsId: string) {
    return this.communityService.toggleLike(newsId, userId);
  }
}
