import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";

import type { IJwtRequest } from "src/auth/types/auth";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

import { CoursesService } from "./courses.service";

import { CoursesListResponseDto, CourseDetailsResponseDto } from "./dto";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCoursesList(
    @Req() req: IJwtRequest,
  ): Promise<CoursesListResponseDto> {
    const userId = req.user?.userId;

    if (!userId) throw new UnauthorizedException();

    return this.coursesService.getCoursesList();
  }

  @Get(":slug")
  @UseGuards(JwtAuthGuard)
  async getCourseBySlug(
    @Param("slug") slug: string,
    @Req() req: IJwtRequest,
  ): Promise<CourseDetailsResponseDto> {
    const userId = req.user?.userId;

    if (!userId) throw new UnauthorizedException();

    const course = await this.coursesService.getCourseBySlug(slug);

    if (!course) {
      throw new NotFoundException(`Course with slug "${slug}" not found`);
    }

    return course;
  }
}
