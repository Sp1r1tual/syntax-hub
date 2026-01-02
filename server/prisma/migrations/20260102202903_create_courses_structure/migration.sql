/*
  Warnings:

  - You are about to drop the column `explanation` on the `questions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[topicId,order]` on the table `questions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId,order]` on the table `topics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ContentBlockType" AS ENUM ('TEXT', 'CODE', 'NOTE', 'IMAGE', 'TABLE');

-- CreateEnum
CREATE TYPE "CodeLanguage" AS ENUM ('JAVASCRIPT', 'TYPESCRIPT', 'HTML', 'CSS', 'JSON', 'BASH', 'PYTHON', 'JAVA', 'CSHARP', 'SQL');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "authorId" TEXT;

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "explanation";

-- CreateTable
CREATE TABLE "content_blocks" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "type" "ContentBlockType" NOT NULL,
    "content" TEXT,
    "language" "CodeLanguage",
    "src" TEXT,
    "alt" TEXT,
    "caption" TEXT,
    "title" TEXT,
    "headers" TEXT[],
    "rows" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 999,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "content_blocks_questionId_idx" ON "content_blocks"("questionId");

-- CreateIndex
CREATE INDEX "content_blocks_order_idx" ON "content_blocks"("order");

-- CreateIndex
CREATE UNIQUE INDEX "content_blocks_questionId_order_key" ON "content_blocks"("questionId", "order");

-- CreateIndex
CREATE INDEX "courses_authorId_idx" ON "courses"("authorId");

-- CreateIndex
CREATE INDEX "questions_order_idx" ON "questions"("order");

-- CreateIndex
CREATE UNIQUE INDEX "questions_topicId_order_key" ON "questions"("topicId", "order");

-- CreateIndex
CREATE INDEX "topics_order_idx" ON "topics"("order");

-- CreateIndex
CREATE UNIQUE INDEX "topics_courseId_order_key" ON "topics"("courseId", "order");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_blocks" ADD CONSTRAINT "content_blocks_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
