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
import z from "zod";

import type { IRequestWithUser } from "src/common/types";

import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUserId } from "src/auth/decorators/get-user-id.decorator";
import { CommentsResponseSchema } from "./schemas/course-comments-response.schema";
import { CommentsResponseDto } from "./dto";

import { CommentsService } from "./course-comments.service";

import { uploadCommentImagesToCloudinary } from "./utils/upload-images";

@Controller("courses")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get("comments/:questionId")
  async getComments(
    @Param("questionId") questionId: string,
    @Req() req: IRequestWithUser,
  ): Promise<CommentsResponseDto[]> {
    const userId = req.user?.userId;

    const commentsList = await this.commentsService.getComments(
      questionId,
      userId,
    );

    if (!commentsList) {
      throw new NotFoundException(`Comments for "${questionId}" not found`);
    }

    return commentsList.map((comment: z.infer<typeof CommentsResponseSchema>) =>
      CommentsResponseDto.create(comment),
    );
  }

  @Patch("comments/:commentId")
  @UseGuards(JwtAuthGuard)
  async toggleLike(
    @GetUserId() userId: string,
    @Param("commentId") commentId: string,
  ): Promise<CommentsResponseDto> {
    const updatedComments = await this.commentsService.toggleLike(
      commentId,
      userId,
    );

    return CommentsResponseDto.create(updatedComments);
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
    const images = await uploadCommentImagesToCloudinary(files, userId);

    const createdComment = await this.commentsService.createComment({
      userId,
      questionId,
      text,
      images,
    });

    return CommentsResponseDto.create(createdComment);
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
    const images = await uploadCommentImagesToCloudinary(files, userId);

    const createdReply = await this.commentsService.replyToComment({
      userId,
      parentCommentId,
      text,
      images,
    });

    return CommentsResponseDto.create(createdReply);
  }

  @Delete("comments/:commentId")
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @GetUserId() userId: string,
    @Param("commentId") commentId: string,
  ) {
    const deletedComment = await this.commentsService.deleteComment(
      commentId,
      userId,
    );

    if (!deletedComment) {
      throw new NotFoundException("Comment not found");
    }

    return CommentsResponseDto.create(deletedComment);
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
    const images = files
      ? await uploadCommentImagesToCloudinary(files, userId)
      : undefined;

    const updatedComment = await this.commentsService.editComment({
      commentId,
      userId,
      text,
      images,
    });

    if (!updatedComment) {
      throw new NotFoundException("Comment not found");
    }

    return CommentsResponseDto.create(updatedComment);
  }
}
