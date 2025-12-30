import { Expose, Type } from "class-transformer";

class CourseCategoryDto {
  @Expose()
  key: string;

  @Expose()
  title: string;

  @Expose()
  icon?: string;
}

class CoursePreviewDto {
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
}

export class CoursesListResponseDto {
  @Expose()
  @Type(() => CoursePreviewDto)
  courses: CoursePreviewDto[];
}
