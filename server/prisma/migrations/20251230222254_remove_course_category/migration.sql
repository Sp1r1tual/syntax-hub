/*
  Warnings:

  - You are about to drop the column `categoryId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the `course_categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupId` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "course_categories" DROP CONSTRAINT "course_categories_groupId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_categoryId_fkey";

-- DropIndex
DROP INDEX "courses_categoryId_idx";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "categoryId",
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 999;

-- DropTable
DROP TABLE "course_categories";

-- CreateIndex
CREATE INDEX "courses_groupId_idx" ON "courses"("groupId");

-- CreateIndex
CREATE INDEX "courses_order_idx" ON "courses"("order");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "category_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
