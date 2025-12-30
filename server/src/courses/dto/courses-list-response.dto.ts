import { Expose, Type } from "class-transformer";

class CourseInGroupDto {
  @Expose()
  slug: string;

  @Expose()
  title: string;

  @Expose()
  description: string | null;

  @Expose()
  icon?: string;
}

class CategoryGroupWithCoursesDto {
  @Expose()
  key: string;

  @Expose()
  title: string;

  @Expose()
  @Type(() => CourseInGroupDto)
  courses: CourseInGroupDto[];
}

export class CoursesGroupedListResponseDto {
  @Expose()
  @Type(() => CategoryGroupWithCoursesDto)
  groups: CategoryGroupWithCoursesDto[];
}
