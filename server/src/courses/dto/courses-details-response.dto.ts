import { Expose, Type, Transform } from "class-transformer";
import { ContentBlockType } from "@prisma/client";

export class CategoryGroupDto {
  @Expose()
  key: string;

  @Expose()
  title: string;
}

export class TableCellDto {
  @Expose()
  id: string;

  @Expose()
  text: string;

  @Expose()
  order: number;
}

export class TableRowDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => TableCellDto)
  cells: TableCellDto[];

  @Expose()
  order: number;
}

export class TableHeaderDto {
  @Expose()
  id: string;

  @Expose()
  text: string;

  @Expose()
  order: number;
}

export class CourseContentDto {
  @Expose()
  id: string;

  @Expose()
  type: string;

  @Expose()
  content?: string;

  @Expose()
  language?: string;

  @Expose()
  src?: string;

  @Expose()
  alt?: string;

  @Expose()
  caption?: string;

  @Expose()
  title?: string;

  @Expose()
  ordered?: boolean;

  @Expose()
  items?: string[];

  @Expose()
  @Type(() => TableHeaderDto)
  headers?: TableHeaderDto[];

  @Expose()
  @Type(() => TableRowDto)
  rows?: TableRowDto[];
}

export class CourseAuthorDto {
  @Expose()
  id: string;

  @Expose()
  name: string | null;
}

class QuestionDto {
  @Expose()
  id: string;

  @Expose()
  text: string;

  @Expose()
  topicId: string;
}

class QuestionDetailDto extends QuestionDto {
  @Expose()
  @Type(() => CourseContentDto)
  blocks: CourseContentDto[];
}

class TopicDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  courseId: string;

  @Expose()
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}

class CourseStructureDto {
  @Expose()
  slug: string;

  @Expose()
  title: string;

  @Expose()
  description: string | null;

  @Expose()
  icon?: string;

  @Expose()
  @Type(() => CategoryGroupDto)
  group: CategoryGroupDto;

  @Expose()
  @Type(() => CourseAuthorDto)
  author: CourseAuthorDto | null;

  @Expose()
  @Type(() => TopicDto)
  topics: TopicDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class CourseDetailsResponseDto {
  @Expose()
  @Type(() => CourseStructureDto)
  structure: CourseStructureDto;

  @Expose()
  @Type(() => QuestionDetailDto)
  content: QuestionDetailDto[];
}
