import { ContentBlockType } from "@prisma/client";

import { prisma } from "../seed";

interface INewsBlockData {
  type: ContentBlockType;
  content?: string;
  title?: string;
  src?: string;
  alt?: string;
  caption?: string;
  items?: string[];
  order: number;
}

interface INewsData {
  title: string;
  likes: number;
  blocks: INewsBlockData[];
}

export async function seedNews() {
  const newsData: INewsData[] = [
    {
      title: "Перші кроки у Frontend",
      likes: 0,
      blocks: [
        {
          type: ContentBlockType.TEXT,
          content: "Це вступна стаття про frontend.",
          order: 1,
        },
        {
          type: ContentBlockType.IMAGE,
          src: "https://picsum.photos/600/300",
          alt: "Приклад зображення",
          caption: "Це демо-зображення",
          order: 2,
        },
        {
          type: ContentBlockType.LIST,
          title: "Приклади типів",
          items: [
            "Number: 42",
            "String: 'hello'",
            "Boolean: true",
            "null",
            "undefined",
          ],
          order: 3,
        },
      ],
    },
    {
      title: "Як працює React",
      likes: 0,
      blocks: [
        {
          type: ContentBlockType.TEXT,
          content: "React дозволяє будувати UI з компонентів.",
          order: 1,
        },
        {
          type: ContentBlockType.LIST,
          title: "Ключові концепції",
          items: ["JSX", "Components", "State & Props"],
          order: 2,
        },
        {
          type: ContentBlockType.LIST,
          title: "Методи масивів",
          items: [
            "push()",
            "pop()",
            "shift()",
            "unshift()",
            "map()",
            "filter()",
          ],
          order: 3,
        },
      ],
    },
  ];

  for (const newsItem of newsData) {
    const existingNews = await prisma.news.findFirst({
      where: { title: newsItem.title },
    });

    if (existingNews) {
      await prisma.newsBlock.deleteMany({
        where: { newsId: existingNews.id },
      });
    }

    const createdNews = await prisma.news.upsert({
      where: { id: existingNews?.id || "" },
      update: { likes: newsItem.likes },
      create: {
        title: newsItem.title,
        likes: newsItem.likes,
      },
    });

    for (const block of newsItem.blocks) {
      if (block.type === ContentBlockType.LIST) {
        await prisma.newsBlock.create({
          data: {
            newsId: createdNews.id,
            type: block.type,
            title: block.title,
            content: block.items?.join("\n"),
            order: block.order,
          },
        });
      } else {
        await prisma.newsBlock.create({
          data: {
            newsId: createdNews.id,
            type: block.type,
            content: block.content,
            title: block.title,
            src: block.src,
            alt: block.alt,
            caption: block.caption,
            order: block.order,
          },
        });
      }
    }
  }
}
