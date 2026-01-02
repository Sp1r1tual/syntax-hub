/*
  Warnings:

  - Changed the type of `rows` on the `content_blocks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "content_blocks" DROP COLUMN "rows",
ADD COLUMN     "rows" JSONB NOT NULL;
