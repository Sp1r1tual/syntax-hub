import { Injectable, NotFoundException } from "@nestjs/common";
import { QuestionStatus } from "@prisma/client";

import { PrismaService } from "src/prisma/prisma.service";
import {
  categoryGroupIncludeWithCourses,
  CategoryGroupWithCourses,
  courseIncludeWithTopics,
  CourseWithTopics,
  QuestionStatusEntity,
} from "./entities/index";

import {
  CoursesGroupedListResponseDto,
  CourseDetailsResponseDto,
  ToggleQuestionStatusResponseDto,
} from "./dto";

@Injectable()
export class CoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly questionStatusEntity: QuestionStatusEntity,
  ) {}

  async getCoursesList(): Promise<CoursesGroupedListResponseDto> {
    const categoryGroups = await this.prisma.categoryGroup.findMany({
      orderBy: { order: "asc" as const },
      include: categoryGroupIncludeWithCourses(),
    });

    return this.mapCategoryGroupsToDto(categoryGroups);
  }

  async getCourseBySlug(
    slug: string,
    userId?: string,
  ): Promise<CourseDetailsResponseDto | null> {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      include: courseIncludeWithTopics(),
    });

    if (!course) {
      return null;
    }

    let userStatuses = new Map<string, QuestionStatus>();

    if (userId) {
      const questionIds = course.topics.flatMap((topic) =>
        topic.questions.map((q) => q.id),
      );

      const statuses = await this.prisma.userQuestionStatus.findMany({
        where: {
          userId,
          questionId: { in: questionIds },
        },
        select: {
          questionId: true,
          status: true,
        },
      });

      userStatuses = new Map(statuses.map((s) => [s.questionId, s.status]));
    }

    return this.mapCourseToDetailsDto(course, userStatuses);
  }

  async toggleQuestionStatus(
    userId: string,
    questionId: string,
    targetStatus: QuestionStatus,
  ): Promise<ToggleQuestionStatusResponseDto> {
    const questionExists = await this.prisma.question.findUnique({
      where: { id: questionId },
      select: { id: true },
    });

    if (!questionExists) {
      throw new NotFoundException(`Question with id "${questionId}" not found`);
    }

    const newStatus = await this.questionStatusEntity.toggle(
      userId,
      questionId,
      targetStatus,
    );

    return ToggleQuestionStatusResponseDto.create({
      questionId,
      status: newStatus?.toLowerCase() as "repeat" | "learned" | undefined,
      message: newStatus
        ? `Question marked as ${newStatus.toLowerCase()}`
        : "Question status removed",
    });
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
    userStatuses: Map<string, QuestionStatus>,
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
      authors: course.authors.map((courseAuthor) => ({
        id: courseAuthor.user.id,
        name: courseAuthor.user.name,
        avatar: courseAuthor.user.avatar,
        socials: courseAuthor.user.socials,
      })),
      topics: course.topics.map((topic) => ({
        id: topic.id,
        title: topic.title,
        courseId: topic.courseId,
        questions: topic.questions.map((q) => ({
          id: q.id,
          text: q.text,
          topicId: q.topicId,
          status: userStatuses.get(q.id)?.toLowerCase() as
            | "repeat"
            | "learned"
            | undefined,
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
        status: userStatuses.get(q.id)?.toLowerCase() as
          | "repeat"
          | "learned"
          | undefined,
      })),
    );

    return CourseDetailsResponseDto.create({ structure, content });
  }
}
