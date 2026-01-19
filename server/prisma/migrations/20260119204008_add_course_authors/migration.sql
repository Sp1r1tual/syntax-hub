/*
  Warnings:

  - You are about to drop the column `authorId` on the `courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_authorId_fkey";

-- DropIndex
DROP INDEX "courses_authorId_idx";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "authorId";

-- CreateTable
CREATE TABLE "course_authors" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 999,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_authors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "course_authors_courseId_idx" ON "course_authors"("courseId");

-- CreateIndex
CREATE INDEX "course_authors_userId_idx" ON "course_authors"("userId");

-- CreateIndex
CREATE INDEX "course_authors_order_idx" ON "course_authors"("order");

-- CreateIndex
CREATE UNIQUE INDEX "course_authors_courseId_userId_key" ON "course_authors"("courseId", "userId");

-- AddForeignKey
ALTER TABLE "course_authors" ADD CONSTRAINT "course_authors_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_authors" ADD CONSTRAINT "course_authors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
