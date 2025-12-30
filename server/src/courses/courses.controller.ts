import { Controller, Get, Param, NotFoundException } from "@nestjs/common";

import { CoursesService } from "./courses.service";

import { CoursesGroupedListResponseDto, CourseDetailsResponseDto } from "./dto";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getCoursesList(): Promise<CoursesGroupedListResponseDto> {
    return this.coursesService.getCoursesList();
  }

  @Get(":slug")
  async getCourseBySlug(
    @Param("slug") slug: string,
  ): Promise<CourseDetailsResponseDto> {
    const course = await this.coursesService.getCourseBySlug(slug);

    if (!course) {
      throw new NotFoundException(`Course with slug "${slug}" not found`);
    }

    return course;
  }
}
