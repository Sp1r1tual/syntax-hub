import { Course } from "@/types/index";

import HTMLLogoPng from "@/assets/html-logo.png";
import CSSLogoPng from "@/assets/css-logo.png";
import JavaScriptLogoPng from "@/assets/JavaScript-logo.png";
import ReactLogoPng from "@/assets/react-logo.png";

export const courses: Course[] = [
  {
    slug: "html",
    title: "HTML",
    description: "Скоро буде!",
    category: "frontend",
    categoryTitle: "Frontend",
    icon: HTMLLogoPng,
  },

  {
    slug: "css",
    title: "CSS",
    description: "Скоро буде!",
    category: "frontend",
    categoryTitle: "Frontend",
    icon: CSSLogoPng,
  },

  {
    slug: "java-script",
    title: "JavaScript",
    description:
      "Основний інструмент для роботи з вебом та сучасними додатками. Додає життя вашому сайту: кнопки, анімації та динамічний контент.",
    category: "frontend",
    categoryTitle: "Frontend",
    icon: JavaScriptLogoPng,
    topics: [
      {
        id: "js-basics-1",
        title: "Основи",
        questions: [
          { id: "js-1", text: "Типи даних" },
          { id: "js-2", text: "== vs ===" },
          { id: "js-3", text: "Способи оголошення змінної" },
          { id: "js-4", text: "Різниця між null і undefined" },
          { id: "js-5", text: "Випливання" },
        ],
      },
      {
        id: "js-topic-2",
        title: "Функції",
        questions: [],
      },
      {
        id: "js-topic-3",
        title: "Об'єкти",
        questions: [],
      },
      {
        id: "js-topic-4",
        title: "Масиви",
        questions: [],
      },
      {
        id: "js-topic-5",
        title: "Цикли",
        questions: [],
      },
      {
        id: "js-topic-6",
        title: "Асинхронність",
        questions: [],
      },
      {
        id: "js-topic-7",
        title: "Класи",
        questions: [],
      },
      {
        id: "js-topic-8",
        title: "DOM",
        questions: [],
      },
      {
        id: "js-topic-9",
        title: "Дебагінг",
        questions: [],
      },
      {
        id: "js-topic-10",
        title: "Просунуті теми",
        questions: [],
      },
    ],
  },

  {
    slug: "react",
    title: "React",
    description: "Скоро буде!",
    category: "frontend",
    categoryTitle: "Frontend",
    icon: ReactLogoPng,
  },
];
