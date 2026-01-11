-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('REPEAT', 'LEARNED');

-- CreateTable
CREATE TABLE "user_question_statuses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "status" "QuestionStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_question_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_question_statuses_userId_idx" ON "user_question_statuses"("userId");

-- CreateIndex
CREATE INDEX "user_question_statuses_questionId_idx" ON "user_question_statuses"("questionId");

-- CreateIndex
CREATE INDEX "user_question_statuses_status_idx" ON "user_question_statuses"("status");

-- CreateIndex
CREATE UNIQUE INDEX "user_question_statuses_userId_questionId_key" ON "user_question_statuses"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "user_question_statuses" ADD CONSTRAINT "user_question_statuses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_question_statuses" ADD CONSTRAINT "user_question_statuses_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
