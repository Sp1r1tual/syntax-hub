import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import {
  categoryGroupIncludeWithCourses,
  CategoryGroupWithCourses,
  courseIncludeWithTopics,
  CourseWithTopics,
} from "./entities/course.entity";

import { CoursesGroupedListResponseDto, CourseDetailsResponseDto } from "./dto";

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCoursesList(): Promise<CoursesGroupedListResponseDto> {
    const categoryGroups = await this.prisma.categoryGroup.findMany({
      orderBy: { order: "asc" as const },
      include: categoryGroupIncludeWithCourses(),
    });

    return this.mapCategoryGroupsToDto(categoryGroups);
  }

  async getCourseBySlug(
    slug: string,
  ): Promise<CourseDetailsResponseDto | null> {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      include: courseIncludeWithTopics(),
    });

    if (!course) {
      return null;
    }

    return this.mapCourseToDetailsDto(course);
  }

  private mapCategoryGroupsToDto(
    groups: CategoryGroupWithCourses[],
  ): CoursesGroupedListResponseDto {
    const mappedGroups = groups.map((group) => ({
      key: group.key,
      title: group.title,
      courses: group.courses,
    }));

    return CoursesGroupedListResponseDto.create({ groups: mappedGroups });
  }

  private mapCourseToDetailsDto(
    course: CourseWithTopics,
  ): CourseDetailsResponseDto {
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
        content: q.content,
        topicId: q.topicId,
      })),
    );

    return CourseDetailsResponseDto.create({ structure, content });
  }
}
