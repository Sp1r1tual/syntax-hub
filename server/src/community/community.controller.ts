import { Controller, Get, Req, UseGuards, Patch, Param } from "@nestjs/common";
import z from "zod";

import type { IRequestWithUser } from "src/common/types";

import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUserId } from "src/auth/decorators/get-user-id.decorator";
import { NewsResponseSchema } from "./schemas/news-response.schema";
import { NewsResponseDto } from "./dto";

import { CommunityService } from "./community.service";

@Controller("community")
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get("news")
  async getNews(@Req() req: IRequestWithUser): Promise<NewsResponseDto[]> {
    const userId = req.user?.userId;

    const newsList = await this.communityService.getNews(userId);

    return newsList.map((news: z.infer<typeof NewsResponseSchema>) =>
      NewsResponseDto.create(news),
    );
  }

  @Patch("news/:newsId")
  @UseGuards(JwtAuthGuard)
  async like(
    @GetUserId() userId: string,
    @Param("newsId") newsId: string,
  ): Promise<NewsResponseDto> {
    const updatedNews = await this.communityService.toggleLike(newsId, userId);

    return NewsResponseDto.create(updatedNews);
  }
}
