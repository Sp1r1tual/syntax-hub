import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { newsIncludeWithLikes, NewsWithLikes } from "./entities/news.entity";

import { NewsResponseDto } from "./dto/news.dto";

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  async getNews(userId?: string): Promise<NewsResponseDto[]> {
    const newsList = await this.prisma.news.findMany({
      orderBy: { createdAt: "desc" as const },
      include: newsIncludeWithLikes(userId),
    });

    return newsList.map((news) => this.mapNewsToDto(news, userId));
  }

  async toggleLike(newsId: string, userId: string): Promise<NewsResponseDto> {
    const news = await this.prisma.news.findUnique({
      where: { id: newsId },
      include: newsIncludeWithLikes(userId),
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

    return NewsResponseDto.create({
      id: news.id,
      title: news.title,
      content: news.content,
      likes: news.likes,
      liked: !alreadyLiked,
      createdAt: news.createdAt,
    });
  }

  private mapNewsToDto(news: NewsWithLikes, userId?: string): NewsResponseDto {
    return NewsResponseDto.create({
      id: news.id,
      title: news.title,
      content: news.content,
      likes: news.likes,
      liked: userId ? news.likedBy.length > 0 : false,
      createdAt: news.createdAt,
    });
  }
}
