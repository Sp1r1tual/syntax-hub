/*
  Warnings:

  - You are about to drop the `content_blocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `news_blocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `table_cells` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `table_headers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `table_rows` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `news` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "content_blocks" DROP CONSTRAINT "content_blocks_questionId_fkey";

-- DropForeignKey
ALTER TABLE "news_blocks" DROP CONSTRAINT "news_blocks_newsId_fkey";

-- DropForeignKey
ALTER TABLE "table_cells" DROP CONSTRAINT "table_cells_rowId_fkey";

-- DropForeignKey
ALTER TABLE "table_headers" DROP CONSTRAINT "table_headers_contentBlockId_fkey";

-- DropForeignKey
ALTER TABLE "table_rows" DROP CONSTRAINT "table_rows_contentBlockId_fkey";

-- AlterTable
ALTER TABLE "news" ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "content" TEXT NOT NULL;

-- DropTable
DROP TABLE "content_blocks";

-- DropTable
DROP TABLE "news_blocks";

-- DropTable
DROP TABLE "table_cells";

-- DropTable
DROP TABLE "table_headers";

-- DropTable
DROP TABLE "table_rows";

-- DropEnum
DROP TYPE "CodeLanguage";

-- DropEnum
DROP TYPE "ContentBlockType";
