import { prisma } from "../seed";
import { ContentBlockType, CodeLanguage, Prisma } from "@prisma/client";

interface ContentBlockData {
  type: ContentBlockType;
  content?: string;
  language?: CodeLanguage;
  src?: string;
  alt?: string;
  caption?: string;
  title?: string;
  headers?: string[];
  rows?: Prisma.InputJsonValue;
  order: number;
}

interface QuestionData {
  text: string;
  order: number;
  blocks: ContentBlockData[];
}

interface TopicData {
  title: string;
  order: number;
  questions: QuestionData[];
}

interface CourseData {
  slug: string;
  title: string;
  description: string;
  groupKey: string;
  icon: string;
  order: number;
  topics: TopicData[];
}

const coursesData: CourseData[] = [
  {
    slug: "html",
    title: "HTML",
    description: "Скоро буде!",
    groupKey: "frontend",
    icon: "html-logo.png",
    order: 1,
    topics: [],
  },
  {
    slug: "css",
    title: "CSS",
    description: "Скоро буде!",
    groupKey: "frontend",
    icon: "css-logo.png",
    order: 2,
    topics: [],
  },
  {
    slug: "java-script",
    title: "JavaScript",
    description:
      "Основний інструмент для роботи з вебом та сучасними додатками. Додає життя вашому сайту: кнопки, анімації та динамічний контент.",
    groupKey: "frontend",
    icon: "javascript-logo.png",
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
                  "typeof null === 'object' — це історичний баг в JavaScript, який залишився для зворотної сумісності.",
                order: 3,
              },
              {
                type: ContentBlockType.TABLE,
                title: "Основні типи даних",
                headers: ["Тип", "Приклад", "Опис"],
                rows: [
                  ["number", "42", "Числа (цілі та дробові)"],
                  ["string", '"hello"', "Текстові рядки"],
                  ["boolean", "true/false", "Логічні значення"],
                  ["null", "null", "Відсутність значення"],
                  ["undefined", "undefined", "Невизначене значення"],
                ],
                order: 4,
              },
            ],
          },
          {
            text: "== vs ===",
            order: 2,
            blocks: [
              {
                type: ContentBlockType.TEXT,
                content:
                  "Оператор === (строга рівність) порівнює значення без приведення типів, тоді як == (нестрога рівність) виконує приведення типів перед порівнянням.",
                order: 1,
              },
              {
                type: ContentBlockType.CODE,
                language: CodeLanguage.JAVASCRIPT,
                content: `// Нестрога рівність (з приведенням типів)\n0 == "0"    // true\n0 == false  // true\nnull == undefined  // true\n\n// Строга рівність (без приведення типів)\n0 === "0"   // false\n0 === false // false\nnull === undefined  // false`,
                order: 2,
              },
              {
                type: ContentBlockType.NOTE,
                content:
                  "Рекомендується завжди використовувати === для уникнення неочікуваної поведінки.",
                order: 3,
              },
            ],
          },
          {
            text: "Способи оголошення змінної",
            order: 3,
            blocks: [
              {
                type: ContentBlockType.TEXT,
                content:
                  "В JavaScript є три способи оголошення змінних: var, let та const. Кожен має свої особливості.",
                order: 1,
              },
              {
                type: ContentBlockType.CODE,
                language: CodeLanguage.JAVASCRIPT,
                content: `// var - старий спосіб (function scope)\nvar x = 10;\n\n// let - змінна зі зміною значення (block scope)\nlet y = 20;\ny = 30; // можна змінити\n\n// const - константа (block scope)\nconst z = 40;\n// z = 50; // помилка! не можна змінити`,
                order: 2,
              },
              {
                type: ContentBlockType.TABLE,
                title: "Порівняння способів оголошення",
                headers: [
                  "Ключове слово",
                  "Область видимості",
                  "Можна змінити",
                  "Hoisting",
                ],
                rows: [
                  ["var", "function", "✅ Так", "✅ Так"],
                  ["let", "block", "✅ Так", "❌ Ні (TDZ)"],
                  ["const", "block", "❌ Ні", "❌ Ні (TDZ)"],
                ],
                order: 3,
              },

              {
                type: ContentBlockType.NOTE,
                content:
                  "Використовуйте const за замовчуванням, let — коли потрібно змінити значення, var — краще не використовувати в сучасному коді.",
                order: 4,
              },
            ],
          },
          {
            text: "Різниця між null і undefined",
            order: 4,
            blocks: [
              {
                type: ContentBlockType.TEXT,
                content:
                  "null та undefined — це два різні типи, які позначають відсутність значення, але з різними значеннями.",
                order: 1,
              },
              {
                type: ContentBlockType.CODE,
                language: CodeLanguage.JAVASCRIPT,
                content: `// undefined - змінна оголошена, але не присвоєно значення\nlet a;\nconsole.log(a); // undefined\n\n// null - явна відсутність значення\nlet b = null;\nconsole.log(b); // null\n\n// Типи\ntypeof undefined; // "undefined"\ntypeof null;      // "object" (історичний баг)`,
                order: 2,
              },
              {
                type: ContentBlockType.NOTE,
                content:
                  "undefined означає, що значення ще не було встановлено, а null — що значення явно відсутнє.",
                order: 3,
              },
            ],
          },
          {
            text: "Hoisting (Піднімання)",
            order: 5,
            blocks: [
              {
                type: ContentBlockType.TEXT,
                content:
                  "Hoisting — це механізм JavaScript, при якому оголошення змінних та функцій переміщуються на початок їх області видимості під час компіляції.",
                order: 1,
              },
              {
                type: ContentBlockType.CODE,
                language: CodeLanguage.JAVASCRIPT,
                content: `// Функції підіймаються повністю\nsayHello(); // Працює!\n\nfunction sayHello() {\n  console.log("Hello!");\n}\n\n// var підіймається, але без значення\nconsole.log(x); // undefined\nvar x = 5;\n\n// let і const не підіймаються (TDZ)\n// console.log(y); // ReferenceError!\nlet y = 10;`,
                order: 2,
              },
              {
                type: ContentBlockType.NOTE,
                content:
                  "TDZ (Temporal Dead Zone) — період між входом в область видимості та оголошенням змінної, де доступ до неї заборонений.",
                order: 3,
              },
            ],
          },
        ],
      },
      {
        title: "Функції",
        order: 2,
        questions: [],
      },
      {
        title: "Об'єкти",
        order: 3,
        questions: [],
      },
      {
        title: "Масиви",
        order: 4,
        questions: [],
      },
      {
        title: "Цикли",
        order: 5,
        questions: [],
      },
      {
        title: "Асинхронність",
        order: 6,
        questions: [],
      },
      {
        title: "Класи",
        order: 7,
        questions: [],
      },
      {
        title: "DOM",
        order: 8,
        questions: [],
      },
      {
        title: "Дебагінг",
        order: 9,
        questions: [],
      },
      {
        title: "Просунуті теми",
        order: 10,
        questions: [],
      },
    ],
  },
  {
    slug: "react",
    title: "React",
    description: "Скоро буде!",
    groupKey: "frontend",
    icon: "react-logo.png",
    order: 4,
    topics: [],
  },
];

export async function seedCourses() {
  console.log("Seeding courses...");

  for (const courseData of coursesData) {
    const group = await prisma.categoryGroup.findUnique({
      where: { key: courseData.groupKey },
    });

    if (!group) {
      console.warn(
        `Group ${courseData.groupKey} not found, skipping course ${courseData.slug}`,
      );
      continue;
    }

    const existingCourse = await prisma.course.findUnique({
      where: { slug: courseData.slug },
    });

    if (existingCourse) {
      await prisma.course.delete({
        where: { slug: courseData.slug },
      });
    }

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

    console.log(`Created course: ${course.title}`);

    for (const topicData of courseData.topics) {
      const topic = await prisma.topic.create({
        data: {
          title: topicData.title,
          order: topicData.order,
          courseId: course.id,
        },
      });

      console.log(`Created topic: ${topic.title}`);

      for (const questionData of topicData.questions) {
        const question = await prisma.question.create({
          data: {
            text: questionData.text,
            order: questionData.order,
            topicId: topic.id,
          },
        });

        console.log(`Created question: ${question.text}`);

        for (const blockData of questionData.blocks) {
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
              headers: blockData.headers || [],
              rows: blockData.rows || [],
              order: blockData.order,
            },
          });
        }

        console.log(`Created ${questionData.blocks.length} content blocks`);
      }
    }
  }
}
