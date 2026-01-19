import {
  Body,
  Controller,
  Get,
  Delete,
  UseGuards,
  Patch,
  Param,
  Post,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Throttle } from "@nestjs/throttler";

import { JwtAuthGuard, OptionalJwtAuthGuard } from "src/auth/guards/index";
import { GetUserId } from "src/auth/decorators";

import { CommentsService } from "./course-comments.service";

@Controller("courses")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get("comments/:questionId")
  @UseGuards(OptionalJwtAuthGuard)
  async getComments(
    @Param("questionId") questionId: string,
    @GetUserId(true) userId: string | undefined,
  ) {
    return this.commentsService.getComments(questionId, userId);
  }

  @Patch("comments/:commentId")
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UseGuards(JwtAuthGuard)
  async toggleLike(
    @GetUserId() userId: string,
    @Param("commentId") commentId: string,
  ) {
    return this.commentsService.toggleLike(commentId, userId);
  }

  @Post("comments/:questionId")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("images"))
  async createComment(
    @Param("questionId") questionId: string,
    @GetUserId() userId: string,
    @Body("text") text: string,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.commentsService.createComment({
      userId,
      questionId,
      text,
      files,
    });
  }

  @Post("comments/:commentId/reply")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("images"))
  async replyToComment(
    @Param("commentId") parentCommentId: string,
    @GetUserId() userId: string,
    @Body("text") text: string,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.commentsService.replyToComment({
      userId,
      parentCommentId,
      text,
      files,
    });
  }

  @Delete("comments/:commentId")
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @GetUserId() userId: string,
    @Param("commentId") commentId: string,
  ) {
    return this.commentsService.deleteComment(commentId, userId);
  }

  @Patch("comments/:commentId/edit")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("images"))
  async editComment(
    @GetUserId() userId: string,
    @Param("commentId") commentId: string,
    @Body("text") text?: string,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.commentsService.editComment({
      commentId,
      userId,
      text,
      files,
    });
  }
}
