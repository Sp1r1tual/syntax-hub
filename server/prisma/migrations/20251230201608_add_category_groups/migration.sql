/*
  Warnings:

  - Added the required column `groupId` to the `course_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course_categories" ADD COLUMN     "groupId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "category_groups" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 999,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_groups_key_key" ON "category_groups"("key");

-- CreateIndex
CREATE INDEX "category_groups_order_idx" ON "category_groups"("order");

-- CreateIndex
CREATE INDEX "course_categories_groupId_idx" ON "course_categories"("groupId");

-- AddForeignKey
ALTER TABLE "course_categories" ADD CONSTRAINT "course_categories_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "category_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
