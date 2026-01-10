import { ICourseSeed } from "./index";

export const javascriptCourse: ICourseSeed = {
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
          content: `Вітаю на початку курсу з JavaScript  
Це мова програмування, без якої сучасна веб-розробка просто не існує. JavaScript відповідає за логіку, взаємодію з користувачем, роботу з даними та поведінку сторінки в браузері і не тільки. Якщо ти хочеш реально розуміти, що відбувається «під капотом» – без JS нікуди.

Почнемо з бази – типів даних.

У JavaScript існує 8 основних типів даних:  
number, string, boolean, null, undefined, object, symbol, bigint.

З них **7 є примітивними**:
- number – числа (цілі та дробові)
- string – рядки
- boolean – логічні значення true / false
- null – явна відсутність значення
- undefined – значення не присвоєне
- symbol – унікальні ідентифікатори
- bigint – числа довільної довжини

І **1 непримітивний тип** – object.

Об’єкти використовуються для зберігання складних структур даних: масивів, функцій, об’єктів, дат тощо.

Важливо розуміти цю різницю з самого початку, бо примітиви копіюються за значенням, а об’єкти – за посиланням. Це одна з ключових особливостей JavaScript, на якій часто ламаються новачки.

\`\`\`javascript
let number = 42;
let text = "hello";
let isActive = true;
\`\`\`

## Основні типи даних

| Тип | Приклад | Опис |
|-----|---------|------|
| number | 42 | Цілі та дробові числа |
| string | "hello" | Текстові рядки |
| boolean | true/false | Логічні значення |
| null | null | Відсутність значення |
| undefined | undefined | Невизначене значення |

> **Примітка:** typeof null === 'object' — історичний баг в JS, залишився для зворотної сумісності.

![JavaScript Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/320px-JavaScript-logo.png "Логотип JavaScript")`,
        },
      ],
    },
    { title: "Типи даних та змінні", order: 2, questions: [] },
    { title: "Умови", order: 3, questions: [] },
    { title: "Цикли", order: 4, questions: [] },
    { title: "Функції та scope", order: 5, questions: [] },
    { title: "Об'єкти та прототипи", order: 6, questions: [] },
    { title: "this та контекст", order: 7, questions: [] },
    { title: "Масиви та структури даних", order: 8, questions: [] },
    { title: "Класи", order: 9, questions: [] },
    { title: "Асинхронність та Event Loop", order: 10, questions: [] },
    { title: "Дебагінг", order: 11, questions: [] },
    { title: "DOM та події", order: 12, questions: [] },
  ],
};
