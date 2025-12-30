import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { PrismaService } from "src/prisma/prisma.service";

import { CoursesListResponseDto, CourseDetailsResponseDto } from "./dto";

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCoursesList(): Promise<CoursesListResponseDto> {
    const courseList = await this.prisma.courseCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        courses: {
          select: {
            slug: true,
            title: true,
            description: true,
            icon: true,
          },
        },
      },
    });

    const courses = courseList.flatMap((category) =>
      category.courses.map((course) => ({
        ...course,
        category: {
          key: category.key,
          title: category.title,
          icon: category.icon,
        },
      })),
    );

    return plainToInstance(
      CoursesListResponseDto,
      { courses },
      { excludeExtraneousValues: true },
    );
  }

  async getCourseBySlug(
    slug: string,
  ): Promise<CourseDetailsResponseDto | null> {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      include: {
        category: true,
        topics: {
          orderBy: { order: "asc" },
          include: {
            questions: {
              orderBy: { order: "asc" },
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
      category: {
        key: course.category.key,
        title: course.category.title,
        icon: course.category.icon,
      },
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
    };

    const content = course.topics.flatMap((topic) =>
      topic.questions.map((q) => ({
        id: q.id,
        text: q.text,
        topicId: q.topicId,
        explanation: q.explanation,
      })),
    );

    return plainToInstance(
      CourseDetailsResponseDto,
      { structure, content },
      { excludeExtraneousValues: true },
    );
  }
}
