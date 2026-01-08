import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";

import { ICreateComment, IEditComment, IReplyToComment } from "./types";

import { CommentsResponseDto } from "./dto";

import { PrismaService } from "../prisma/prisma.service";

import {
  commentIncludeWithNestedReplies,
  commentIncludeWithReplies,
  commentIncludeBasic,
} from "./entities/comment-includes";
import { deleteOldCommentImagesIfNeeded } from "./utils/delete-old-images";
import {
  transformComment,
  flattenDeepReplies,
} from "./utils/transform-comment";

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getComments(
    questionId: string,
    userId?: string,
  ): Promise<CommentsResponseDto[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        questionId,
        parentId: null,
        deletedAt: null,
      },
      include: commentIncludeWithNestedReplies(userId),
      orderBy: { createdAt: "desc" },
    });

    return comments.map((comment) =>
      CommentsResponseDto.create(
        flattenDeepReplies(transformComment(comment, userId)),
      ),
    );
  }

  async toggleLike(
    commentId: string,
    userId: string,
  ): Promise<CommentsResponseDto> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: commentIncludeWithReplies(userId),
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    const alreadyLiked = comment.likes.length > 0;

    if (alreadyLiked) {
      await this.prisma.commentLike.delete({
        where: {
          commentId_userId: {
            commentId,
            userId,
          },
        },
      });
    } else {
      await this.prisma.commentLike.create({
        data: {
          commentId,
          userId,
        },
      });
    }

    const updatedComment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: commentIncludeWithReplies(userId),
    });

    return CommentsResponseDto.create(transformComment(updatedComment, userId));
  }

  async createComment(data: ICreateComment): Promise<CommentsResponseDto> {
    const comment = await this.prisma.comment.create({
      data: {
        userId: data.userId,
        questionId: data.questionId,
        text: data.text,
        images: {
          create: data.images.map((img) => ({
            src: img.src,
            order: img.order,
          })),
        },
      },
      include: commentIncludeBasic(data.userId),
    });

    return CommentsResponseDto.create(transformComment(comment, data.userId));
  }

  async replyToComment(data: IReplyToComment): Promise<CommentsResponseDto> {
    const parentComment = await this.prisma.comment.findUnique({
      where: { id: data.parentCommentId },
    });

    if (!parentComment) {
      throw new NotFoundException("Parent comment not found");
    }

    const reply = await this.prisma.comment.create({
      data: {
        userId: data.userId,
        questionId: parentComment.questionId,
        parentId: data.parentCommentId,
        text: data.text,
        images: {
          create: data.images.map((img) => ({
            src: img.src,
            order: img.order,
          })),
        },
      },
      include: commentIncludeBasic(data.userId),
    });

    return CommentsResponseDto.create(transformComment(reply, data.userId));
  }

  async deleteComment(
    commentId: string,
    userId: string,
  ): Promise<CommentsResponseDto> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        images: true,
        replies: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException(
        "You are not allowed to delete this comment",
      );
    }

    const getAllChildIds = async (parentId: string): Promise<string[]> => {
      const children = await this.prisma.comment.findMany({
        where: { parentId },
        select: { id: true },
      });

      const childIds = children.map((child) => child.id);

      const nestedChildIds = await Promise.all(
        childIds.map((id) => getAllChildIds(id)),
      );

      return [...childIds, ...nestedChildIds.flat()];
    };

    const allChildIds = await getAllChildIds(commentId);
    const allCommentIds = [commentId, ...allChildIds];

    const allComments = await this.prisma.comment.findMany({
      where: { id: { in: allCommentIds } },
      include: { images: true },
    });

    const allImages = allComments.flatMap((c) => c.images);

    if (allImages.length > 0) {
      await deleteOldCommentImagesIfNeeded(allImages);
    }

    await this.prisma.commentImage.deleteMany({
      where: { commentId: { in: allCommentIds } },
    });

    await this.prisma.commentLike.deleteMany({
      where: { commentId: { in: allCommentIds } },
    });

    await this.prisma.comment.updateMany({
      where: { id: { in: allCommentIds } },
      data: {
        deletedAt: new Date(),
        text: "[Deleted]",
      },
    });

    const deletedComment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: commentIncludeWithReplies(userId),
    });

    return CommentsResponseDto.create(transformComment(deletedComment, userId));
  }

  async editComment(data: IEditComment): Promise<CommentsResponseDto> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: data.commentId },
      include: {
        images: true,
      },
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    if (comment.userId !== data.userId) {
      throw new ForbiddenException("You are not allowed to edit this comment");
    }

    if (data.images !== undefined) {
      await deleteOldCommentImagesIfNeeded(
        comment.images,
        data.images.map((img) => ({ src: img.src })),
      );

      await this.prisma.commentImage.deleteMany({
        where: { commentId: data.commentId },
      });
    }

    const updateData: {
      updatedAt: Date;
      text?: string;
      images?: {
        create: Array<{ src: string; order: number }>;
      };
    } = {
      updatedAt: new Date(),
    };

    if (data.text !== undefined) {
      updateData.text = data.text;
    }

    if (data.images !== undefined) {
      updateData.images = {
        create: data.images.map((img) => ({
          src: img.src,
          order: img.order,
        })),
      };
    }

    const updatedComment = await this.prisma.comment.update({
      where: { id: data.commentId },
      data: updateData,
      include: commentIncludeWithReplies(data.userId),
    });

    return CommentsResponseDto.create(
      transformComment(updatedComment, data.userId),
    );
  }
}
