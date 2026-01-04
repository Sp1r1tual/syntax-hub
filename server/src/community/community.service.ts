import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

import { NewsResponseDto } from "./dto/news-response.dto";
import { NewsContentArrayDto } from "./dto/news-content-array.dto";

import { ContentBlockMapper } from "src/common/utils/content-block-mapper";

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  async getNews(userId?: string): Promise<NewsResponseDto[]> {
    const newsList = await this.prisma.news.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        blocks: {
          orderBy: { order: "asc" },
        },
        likedBy: userId ? { where: { userId } } : false,
      },
    });

    return newsList.map((news) => {
      const transformedBlocks = ContentBlockMapper.mapBlocks(news.blocks);
      const content = NewsContentArrayDto.create(transformedBlocks);

      return NewsResponseDto.create({
        id: news.id,
        title: news.title,
        likes: news.likes,
        liked: userId ? news.likedBy.length > 0 : false,
        content,
        createdAt: news.createdAt,
      });
    });
  }

  async toggleLike(newsId: string, userId: string): Promise<NewsResponseDto> {
    const news = await this.prisma.news.findUnique({
      where: { id: newsId },
      include: {
        likedBy: { where: { userId } },
        blocks: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!news) throw new NotFoundException("News not found");

    const alreadyLiked = news.likedBy.length > 0;

    if (alreadyLiked) {
      await this.prisma.newsLike.delete({
        where: { newsId_userId: { newsId, userId } },
      });
      news.likes -= 1;
    } else {
      await this.prisma.newsLike.create({ data: { newsId, userId } });
      news.likes += 1;
    }

    await this.prisma.news.update({
      where: { id: newsId },
      data: { likes: news.likes },
    });

    const transformedBlocks = ContentBlockMapper.mapBlocks(news.blocks);
    const content = NewsContentArrayDto.create(transformedBlocks);

    return NewsResponseDto.create({
      id: news.id,
      title: news.title,
      likes: news.likes,
      liked: !alreadyLiked,
      content,
      createdAt: news.createdAt,
    });
  }
}
