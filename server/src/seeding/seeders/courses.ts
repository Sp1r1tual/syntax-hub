import { prisma } from "../seed";
import { ContentBlockType, CodeLanguage } from "@prisma/client";

interface ITableCellData {
  text: string;
  order: number;
}

interface ITableRowData {
  order: number;
  cells: ITableCellData[];
}

interface ITableHeaderData {
  text: string;
  order: number;
}

interface IContentBlockData {
  type: ContentBlockType;
  content?: string;
  language?: CodeLanguage;
  src?: string;
  alt?: string;
  caption?: string;
  title?: string;
  headers?: ITableHeaderData[];
  rows?: ITableRowData[];
  items?: string[];
  order: number;
}

interface IQuestionData {
  text: string;
  order: number;
  blocks: IContentBlockData[];
}

interface ITopicData {
  title: string;
  order: number;
  questions: IQuestionData[];
}

interface ICourseData {
  slug: string;
  title: string;
  description: string;
  groupKey: string;
  icon: string;
  order: number;
  topics: ITopicData[];
}

const coursesData: ICourseData[] = [
  {
    slug: "html",
    title: "HTML",
    description: "Скоро буде!",
    groupKey: "frontend",
    icon: "https://naqhdzpocsklzkhutzwc.supabase.co/storage/v1/object/sign/syntax-hub/courses/groups/html-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZDFhZmE1NS00MzFhLTQxMDgtOTE0ZS02NTcxMmE0YjZkNGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzeW50YXgtaHViL2NvdXJzZXMvZ3JvdXBzL2h0bWwtbG9nby5wbmciLCJpYXQiOjE3Njc0MzI0MDEsImV4cCI6NDg4OTQ5NjQwMX0.w9JkQBGvlzPCsnVrJHuAXjRvSp3qtJQggs1VaRmzhgY",
    order: 1,
    topics: [],
  },
  {
    slug: "css",
    title: "CSS",
    description: "Скоро буде!",
    groupKey: "frontend",
    icon: "https://naqhdzpocsklzkhutzwc.supabase.co/storage/v1/object/sign/syntax-hub/courses/groups/css-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZDFhZmE1NS00MzFhLTQxMDgtOTE0ZS02NTcxMmE0YjZkNGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzeW50YXgtaHViL2NvdXJzZXMvZ3JvdXBzL2Nzcy1sb2dvLnBuZyIsImlhdCI6MTc2NzQzMjM4MCwiZXhwIjo0ODg5NDk2MzgwfQ.jAtNw166do_Ws5Vl9pczeAhNkogEXkt5aLegVlRWBwA",
    order: 2,
    topics: [],
  },
  {
    slug: "java-script",
    title: "JavaScript",
    description:
      "Основний інструмент для роботи з вебом та сучасними додатками. Додає життя вашому сайту: кнопки, анімації та динамічний контент.",
    groupKey: "frontend",
    icon: "https://naqhdzpocsklzkhutzwc.supabase.co/storage/v1/object/sign/syntax-hub/courses/groups/javascript-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZDFhZmE1NS00MzFhLTQxMDgtOTE0ZS02NTcxMmE0YjZkNGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzeW50YXgtaHViL2NvdXJzZXMvZ3JvdXBzL2phdmFzY3JpcHQtbG9nby5wbmciLCJpYXQiOjE3Njc1MzQ3ODAsImV4cCI6NDg4OTU5ODc4MH0.TqQOpquP1Q0mO3x73NIoXpDB0OvtJAKzg-e17UVE3E4",
    order: 3,
    topics: [
      {
        title: "Основи",
        order: 1,
        questions: [
          {
            text: "Типи даних",
            order: 1,
            blocks: [
              {
                type: ContentBlockType.TEXT,
                content:
                  "В JavaScript існує 8 основних типів даних: number, string, boolean, null, undefined, object, symbol, bigint.",
                order: 1,
              },
              {
                type: ContentBlockType.CODE,
                language: CodeLanguage.JAVASCRIPT,
                content: `let num = 42;\nlet str = "hello";\nlet bool = true;\nlet nothing = null;\nlet notDefined = undefined;`,
                order: 2,
              },
              {
                type: ContentBlockType.NOTE,
                content:
                  "typeof null === 'object' — історичний баг в JS, залишився для зворотної сумісності.",
                order: 3,
              },
              {
                type: ContentBlockType.TABLE,
                title: "Основні типи даних",
                headers: [
                  { text: "Тип", order: 0 },
                  { text: "Приклад", order: 1 },
                  { text: "Опис", order: 2 },
                ],
                rows: [
                  {
                    order: 0,
                    cells: [
                      { text: "number", order: 0 },
                      { text: "42", order: 1 },
                      { text: "Цілі та дробові числа", order: 2 },
                    ],
                  },
                  {
                    order: 1,
                    cells: [
                      { text: "string", order: 0 },
                      { text: '"hello"', order: 1 },
                      { text: "Текстові рядки", order: 2 },
                    ],
                  },
                  {
                    order: 2,
                    cells: [
                      { text: "boolean", order: 0 },
                      { text: "true/false", order: 1 },
                      { text: "Логічні значення", order: 2 },
                    ],
                  },
                  {
                    order: 3,
                    cells: [
                      { text: "null", order: 0 },
                      { text: "null", order: 1 },
                      { text: "Відсутність значення", order: 2 },
                    ],
                  },
                  {
                    order: 4,
                    cells: [
                      { text: "undefined", order: 0 },
                      { text: "undefined", order: 1 },
                      { text: "Невизначене значення", order: 2 },
                    ],
                  },
                ],
                order: 4,
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
                order: 5,
              },
              {
                type: ContentBlockType.IMAGE,
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/320px-JavaScript-logo.png",
                alt: "JavaScript Logo",
                caption: "Логотип JavaScript",
                order: 6,
              },
            ],
          },
        ],
      },
      {
        title: "Масиви",
        order: 2,
        questions: [
          {
            text: "Створення масивів",
            order: 1,
            blocks: [
              {
                type: ContentBlockType.TEXT,
                content: "Масиви — це списки значень у JavaScript.",
                order: 1,
              },
              {
                type: ContentBlockType.CODE,
                language: CodeLanguage.JAVASCRIPT,
                content: `const arr = [1, 2, 3, 4];\nconsole.log(arr[0]); // 1`,
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
              {
                type: ContentBlockType.IMAGE,
                src: "https://upload.wikimedia.org/wikipedia/commons/0/0a/JavaScript-array.png",
                alt: "Масиви в JS",
                caption: "Приклад масиву в JavaScript",
                order: 4,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "react",
    title: "React",
    description: "Скоро буде!",
    groupKey: "frontend",
    icon: "https://naqhdzpocsklzkhutzwc.supabase.co/storage/v1/object/sign/syntax-hub/courses/groups/react-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZDFhZmE1NS00MzFhLTQxMDgtOTE0ZS02NTcxMmE0YjZkNGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzeW50YXgtaHViL2NvdXJzZXMvZ3JvdXBzL3JlYWN0LWxvZ28ucG5nIiwiaWF0IjoxNzY3NDMyNDM3LCJleHAiOjQ4ODk0OTY0Mzd9.H1Qpa9uj3G4SQMabw9VMqeXAHYDcLSwqZTlBA32PPj8",
    order: 4,
    topics: [],
  },
];

export async function seedCourses() {
  for (const courseData of coursesData) {
    const group = await prisma.categoryGroup.findUnique({
      where: { key: courseData.groupKey },
    });
    if (!group) continue;

    const existingCourse = await prisma.course.findUnique({
      where: { slug: courseData.slug },
    });
    if (existingCourse)
      await prisma.course.delete({ where: { slug: courseData.slug } });

    const course = await prisma.course.create({
      data: {
        slug: courseData.slug,
        title: courseData.title,
        description: courseData.description,
        icon: courseData.icon,
        groupId: group.id,
        order: courseData.order,
      },
    });

    for (const topicData of courseData.topics) {
      const topic = await prisma.topic.create({
        data: {
          title: topicData.title,
          order: topicData.order,
          courseId: course.id,
        },
      });

      for (const questionData of topicData.questions) {
        const question = await prisma.question.create({
          data: {
            text: questionData.text,
            order: questionData.order,
            topicId: topic.id,
          },
        });

        for (const blockData of questionData.blocks) {
          if (blockData.type === ContentBlockType.TABLE) {
            await prisma.contentBlock.create({
              data: {
                questionId: question.id,
                type: blockData.type,
                title: blockData.title,
                order: blockData.order,
                headers: {
                  create:
                    blockData.headers?.map((h) => ({
                      text: h.text,
                      order: h.order,
                    })) || [],
                },
                rows: {
                  create:
                    blockData.rows?.map((r) => ({
                      order: r.order,
                      cells: {
                        create: r.cells.map((c) => ({
                          text: c.text,
                          order: c.order,
                        })),
                      },
                    })) || [],
                },
              },
            });
          } else if (blockData.type === ContentBlockType.LIST) {
            await prisma.contentBlock.create({
              data: {
                questionId: question.id,
                type: blockData.type,
                title: blockData.title,
                order: blockData.order,
                content: blockData.items?.join("\n"),
              },
            });
          } else {
            await prisma.contentBlock.create({
              data: {
                questionId: question.id,
                type: blockData.type,
                content: blockData.content,
                language: blockData.language,
                src: blockData.src,
                alt: blockData.alt,
                caption: blockData.caption,
                title: blockData.title,
                order: blockData.order,
              },
            });
          }
        }
      }
    }
  }
}
