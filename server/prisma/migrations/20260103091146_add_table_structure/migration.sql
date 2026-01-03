/*
  Warnings:

  - You are about to drop the column `headers` on the `content_blocks` table. All the data in the column will be lost.
  - You are about to drop the column `rows` on the `content_blocks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "content_blocks" DROP COLUMN "headers",
DROP COLUMN "rows";

-- CreateTable
CREATE TABLE "table_headers" (
    "id" TEXT NOT NULL,
    "contentBlockId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 999,

    CONSTRAINT "table_headers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table_rows" (
    "id" TEXT NOT NULL,
    "contentBlockId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 999,

    CONSTRAINT "table_rows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table_cells" (
    "id" TEXT NOT NULL,
    "rowId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 999,

    CONSTRAINT "table_cells_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "table_headers_contentBlockId_idx" ON "table_headers"("contentBlockId");

-- CreateIndex
CREATE INDEX "table_headers_order_idx" ON "table_headers"("order");

-- CreateIndex
CREATE UNIQUE INDEX "table_headers_contentBlockId_order_key" ON "table_headers"("contentBlockId", "order");

-- CreateIndex
CREATE INDEX "table_rows_contentBlockId_idx" ON "table_rows"("contentBlockId");

-- CreateIndex
CREATE INDEX "table_rows_order_idx" ON "table_rows"("order");

-- CreateIndex
CREATE UNIQUE INDEX "table_rows_contentBlockId_order_key" ON "table_rows"("contentBlockId", "order");

-- CreateIndex
CREATE INDEX "table_cells_rowId_idx" ON "table_cells"("rowId");

-- CreateIndex
CREATE INDEX "table_cells_order_idx" ON "table_cells"("order");

-- CreateIndex
CREATE UNIQUE INDEX "table_cells_rowId_order_key" ON "table_cells"("rowId", "order");

-- AddForeignKey
ALTER TABLE "table_headers" ADD CONSTRAINT "table_headers_contentBlockId_fkey" FOREIGN KEY ("contentBlockId") REFERENCES "content_blocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table_rows" ADD CONSTRAINT "table_rows_contentBlockId_fkey" FOREIGN KEY ("contentBlockId") REFERENCES "content_blocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table_cells" ADD CONSTRAINT "table_cells_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "table_rows"("id") ON DELETE CASCADE ON UPDATE CASCADE;
