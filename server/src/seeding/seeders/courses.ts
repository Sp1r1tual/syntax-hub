import { prisma } from "../seed";

const coursesData = [
  {
    slug: "html",
    title: "HTML",
    description: "Скоро буде!",
    categoryKey: "html",
    icon: "html-logo.png",
    topics: [],
  },
  {
    slug: "css",
    title: "CSS",
    description: "Скоро буде!",
    categoryKey: "css",
    icon: "css-logo.png",
    topics: [],
  },
  {
    slug: "java-script",
    title: "JavaScript",
    description:
      "Основний інструмент для роботи з вебом та сучасними додатками. Додає життя вашому сайту: кнопки, анімації та динамічний контент.",
    categoryKey: "javascript",
    icon: "javascript-logo.png",
    topics: [
      {
        title: "Основи",
        order: 1,
        questions: [
          {
            text: "Типи даних",
            explanation: "Тут буде пояснення про типи даних в JavaScript...",
            order: 1,
          },
          {
            text: "== vs ===",
            explanation: "Тут буде пояснення про різницю між == і ===...",
            order: 2,
          },
          {
            text: "Способи оголошення змінної",
            explanation: "Тут буде пояснення про var, let, const...",
            order: 3,
          },
          {
            text: "Різниця між null і undefined",
            explanation: "Тут буде пояснення про null і undefined...",
            order: 4,
          },
          {
            text: "Випливання",
            explanation: "Тут буде пояснення про hoisting...",
            order: 5,
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
    categoryKey: "react",
    icon: "react-logo.png",
    topics: [],
  },
];

export async function seedCourses() {
  for (const courseData of coursesData) {
    const category = await prisma.courseCategory.findUnique({
      where: { key: courseData.categoryKey },
    });

    if (!category) {
      console.warn(
        `Category ${courseData.categoryKey} not found, skipping course ${courseData.slug}`,
      );
      continue;
    }

    const course = await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: {
        title: courseData.title,
        description: courseData.description,
        icon: courseData.icon,
        categoryId: category.id,
      },
      create: {
        slug: courseData.slug,
        title: courseData.title,
        description: courseData.description,
        icon: courseData.icon,
        categoryId: category.id,
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
        await prisma.question.create({
          data: {
            text: questionData.text,
            explanation: questionData.explanation,
            order: questionData.order,
            topicId: topic.id,
          },
        });
      }
    }
  }
}
