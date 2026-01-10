import { prisma } from "../seed";

interface INewsData {
  title: string;
  content: string;
  likes: number;
}

export async function seedNews() {
  const newsData: INewsData[] = [
    {
      title: "Вітаємо у SyntaxHub!",
      likes: 0,
      content: `Ласкаво просимо до **SyntaxHub** – вашої платформи для вивчення програмування! Ми раді вітати вас у нашій спільноті розробників.

![Вітальне зображення SyntaxHub](https://naqhdzpocsklzkhutzwc.supabase.co/storage/v1/object/sign/syntax-hub/news/syntax-hub-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZDFhZmE1NS00MzFhLTQxMDgtOTE0ZS02NTcxMmE0YjZkNGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzeW50YXgtaHViL25ld3Mvc3ludGF4LWh1Yi1sb2dvLnBuZyIsImlhdCI6MTc2ODA0NDY1NSwiZXhwIjo0ODkwMTA4NjU1fQ.8MYTAF1xc2cdbnjdRxj-2ub_5LfC3duge09bjTjtlUw)
*Почніть свій шлях у програмуванні разом з нами*

Зараз платформа перебуває на етапі активного наповнення контентом. Ми регулярно додаємо нові курси, статті та навчальні матеріали, щоб зробити ваше навчання максимально ефективним та цікавим.

## Що вас чекає на платформі

- Структуровані курси від основ до просунутого рівня
- Інтерактивні приклади коду
- Актуальні матеріали по сучасним технологіям
- Регулярні оновлення та нові курси
- Спільнота однодумців

Ми працюємо над тим, щоб кожен курс був максимально корисним та зрозумілим. Слідкуйте за оновленнями – найближчим часом з'являться нові курси по Frontend, Backend, DevOps та багато іншого!

## Найближчі плани

- Запуск курсів з JavaScript та TypeScript
- Додавання матеріалів з React
- Система прогресу та досягнень`,
    },
  ];

  for (const newsItem of newsData) {
    await prisma.news.upsert({
      where: { title: newsItem.title },
      update: {
        content: newsItem.content,
        likes: newsItem.likes,
      },
      create: {
        title: newsItem.title,
        content: newsItem.content,
        likes: newsItem.likes,
      },
    });
  }
}
