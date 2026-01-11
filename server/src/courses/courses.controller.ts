import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseGuards,
  Req,
  Patch,
} from "@nestjs/common";

import type { IRequestWithUser } from "src/common/types";

import { GetUserId } from "src/auth/decorators/get-user-id.decorator";
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
    @Req() req: IRequestWithUser,
  ) {
    const userId = req.user?.userId;

    const course = await this.coursesService.getCourseBySlug(slug, userId);

    if (!course) {
      throw new NotFoundException(`Course with slug "${slug}" not found`);
    }

    return course;
  }

  @Patch("mark-question-as-repeat/:questionId")
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
