import { Expose, Type } from "class-transformer";

class CourseInCategoryDto {
  @Expose()
  slug: string;

  @Expose()
  title: string;

  @Expose()
  description: string | null;

  @Expose()
  icon?: string;
}

class CategoryWithCoursesDto {
  @Expose()
  key: string;

  @Expose()
  title: string;

  @Expose()
  icon?: string;

  @Expose()
  @Type(() => CourseInCategoryDto)
  courses: CourseInCategoryDto[];
}

class CategoryGroupWithDataDto {
  @Expose()
  key: string;

  @Expose()
  title: string;

  @Expose()
  @Type(() => CategoryWithCoursesDto)
  categories: CategoryWithCoursesDto[];
}

export class CoursesGroupedListResponseDto {
  @Expose()
  @Type(() => CategoryGroupWithDataDto)
  groups: CategoryGroupWithDataDto[];
}
