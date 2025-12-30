import { Expose, Type } from "class-transformer";

class CourseCategoryDto {
  @Expose()
  key: string;

  @Expose()
  title: string;

  @Expose()
  icon?: string;
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
  explanation: string;
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
  @Type(() => CourseCategoryDto)
  category: CourseCategoryDto;

  @Expose()
  @Type(() => TopicDto)
  topics: TopicDto[];
}

export class CourseDetailsResponseDto {
  @Expose()
  @Type(() => CourseStructureDto)
  structure: CourseStructureDto;

  @Expose()
  @Type(() => QuestionDetailDto)
  content: QuestionDetailDto[];
}
