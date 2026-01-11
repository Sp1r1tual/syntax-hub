import { Injectable } from "@nestjs/common";

import { QuestionStatus } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class QuestionStatusEntity {
  constructor(private readonly prisma: PrismaService) {}

  async toggle(
    userId: string,
    questionId: string,
    targetStatus: QuestionStatus,
  ): Promise<QuestionStatus | undefined> {
    const existing = await this.prisma.userQuestionStatus.findUnique({
      where: {
        userId_questionId: { userId, questionId },
      },
    });

    if (!existing) {
      await this.prisma.userQuestionStatus.create({
        data: { userId, questionId, status: targetStatus },
      });
      return targetStatus;
    }

    if (existing.status === targetStatus) {
      await this.prisma.userQuestionStatus.delete({
        where: {
          userId_questionId: { userId, questionId },
        },
      });
      return undefined;
    }

    await this.prisma.userQuestionStatus.update({
      where: {
        userId_questionId: { userId, questionId },
      },
      data: { status: targetStatus },
    });

    return targetStatus;
  }
}
