import { Controller, Get, Param, NotFoundException } from "@nestjs/common";

import { CoursesService } from "./courses.service";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getCoursesList() {
    return this.coursesService.getCoursesList();
  }

  @Get(":slug")
  async getCourseBySlug(@Param("slug") slug: string) {
    const course = await this.coursesService.getCourseBySlug(slug);

    if (!course) {
      throw new NotFoundException(`Course with slug "${slug}" not found`);
    }

    return course;
  }
}
