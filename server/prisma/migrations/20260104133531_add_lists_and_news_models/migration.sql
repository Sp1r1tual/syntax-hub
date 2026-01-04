-- AlterEnum
ALTER TYPE "ContentBlockType" ADD VALUE 'LIST';

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_blocks" (
    "id" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,
    "type" "ContentBlockType" NOT NULL,
    "content" TEXT,
    "title" TEXT,
    "src" TEXT,
    "alt" TEXT,
    "caption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 999,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_likes" (
    "id" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "news_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "news_blocks_newsId_idx" ON "news_blocks"("newsId");

-- CreateIndex
CREATE INDEX "news_blocks_order_idx" ON "news_blocks"("order");

-- CreateIndex
CREATE INDEX "news_likes_userId_idx" ON "news_likes"("userId");

-- CreateIndex
CREATE INDEX "news_likes_newsId_idx" ON "news_likes"("newsId");

-- CreateIndex
CREATE UNIQUE INDEX "news_likes_newsId_userId_key" ON "news_likes"("newsId", "userId");

-- AddForeignKey
ALTER TABLE "news_blocks" ADD CONSTRAINT "news_blocks_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_likes" ADD CONSTRAINT "news_likes_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_likes" ADD CONSTRAINT "news_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
