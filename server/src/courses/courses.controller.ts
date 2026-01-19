import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";

import { GetUserId } from "src/auth/decorators";
import { JwtAuthGuard, OptionalJwtAuthGuard } from "src/auth/guards/index";

import { CoursesService } from "./courses.service";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getCoursesList() {
    return this.coursesService.getCoursesList();
  }

  @Get(":slug")
  @UseGuards(OptionalJwtAuthGuard)
  async getCourseBySlug(
    @Param("slug") slug: string,
    @GetUserId(true) userId: string | undefined,
  ) {
    const course = await this.coursesService.getCourseBySlug(slug, userId);

    if (!course) {
      throw new NotFoundException(`Course with slug "${slug}" not found`);
    }

    return course;
  }

  @Patch("mark-question-as-repeat/:questionId")
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UseGuards(JwtAuthGuard)
  async toggleQuestionAsRepeat(
    @GetUserId() userId: string,
    @Param("questionId") questionId: string,
  ) {
    return this.coursesService.toggleQuestionStatus(
      userId,
      questionId,
      "REPEAT",
    );
  }

  @Patch("mark-question-as-learned/:questionId")
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UseGuards(JwtAuthGuard)
  async toggleQuestionAsLearned(
    @GetUserId() userId: string,
    @Param("questionId") questionId: string,
  ) {
    return this.coursesService.toggleQuestionStatus(
      userId,
      questionId,
      "LEARNED",
    );
  }
}
