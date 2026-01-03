import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { PrismaService } from "src/prisma/prisma.service";

import { CoursesGroupedListResponseDto, CourseDetailsResponseDto } from "./dto";

import { ContentBlockMapper } from "./utils/content-block.mapper";

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCoursesList(): Promise<CoursesGroupedListResponseDto> {
    const categoryGroups = await this.prisma.categoryGroup.findMany({
      orderBy: { order: "asc" },
      include: {
        courses: {
          orderBy: { order: "asc" },
          select: {
            slug: true,
            title: true,
            description: true,
            icon: true,
          },
        },
      },
    });

    const groups = categoryGroups.map((group) => ({
      key: group.key,
      title: group.title,
      courses: group.courses,
    }));

    return plainToInstance(
      CoursesGroupedListResponseDto,
      { groups },
      { excludeExtraneousValues: true },
    );
  }

  async getCourseBySlug(
    slug: string,
  ): Promise<CourseDetailsResponseDto | null> {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      include: {
        group: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        topics: {
          orderBy: { order: "asc" },
          include: {
            questions: {
              orderBy: { order: "asc" },
              include: {
                blocks: {
                  orderBy: { order: "asc" },
                  include: {
                    headers: {
                      orderBy: { order: "asc" },
                    },
                    rows: {
                      orderBy: { order: "asc" },
                      include: {
                        cells: {
                          orderBy: { order: "asc" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!course) {
      return null;
    }

    const structure = {
      slug: course.slug,
      title: course.title,
      description: course.description,
      icon: course.icon,
      group: {
        key: course.group.key,
        title: course.group.title,
      },
      author: course.author
        ? {
            id: course.author.id,
            name: course.author.name,
          }
        : null,
      topics: course.topics.map((topic) => ({
        id: topic.id,
        title: topic.title,
        courseId: topic.courseId,
        questions: topic.questions.map((q) => ({
          id: q.id,
          text: q.text,
          topicId: q.topicId,
        })),
      })),
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };

    const content = course.topics.flatMap((topic) =>
      topic.questions.map((q) => ({
        id: q.id,
        text: q.text,
        topicId: q.topicId,
        blocks: q.blocks.map((block) => ContentBlockMapper.mapBlock(block)),
      })),
    );

    return plainToInstance(
      CourseDetailsResponseDto,
      { structure, content },
      { excludeExtraneousValues: true },
    );
  }
}
