import {
  Body,
  Controller,
  Get,
  Req,
  Delete,
  UseGuards,
  Patch,
  Param,
  NotFoundException,
  Post,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

import type { IRequestWithUser } from "src/common/types";

import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUserId } from "src/auth/decorators/get-user-id.decorator";

import { CommentsService } from "./course-comments.service";

@Controller("courses")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get("comments/:questionId")
  async getComments(
    @Param("questionId") questionId: string,
    @Req() req: IRequestWithUser,
  ) {
    const userId = req.user?.userId;
    const comments = await this.commentsService.getComments(questionId, userId);

    if (!comments.length) {
      throw new NotFoundException(`Comments for "${questionId}" not found`);
    }

    return comments;
  }

  @Patch("comments/:commentId")
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
