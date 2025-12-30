import { prisma } from "../seed";

export const seedCategories = async () => {
  const categories = [
    { key: "html", title: "HTML", order: 1 },
    { key: "css", title: "CSS", order: 2 },
    { key: "javascript", title: "JavaScript", order: 3 },
    { key: "react", title: "React", order: 4 },
    { key: "typescript", title: "TypeScript", order: 5 },
    { key: "nodejs", title: "Node.js", order: 6 },
  ];

  for (const c of categories) {
    await prisma.courseCategory.upsert({
      where: { key: c.key },
      update: { title: c.title },
      create: c,
    });
  }
};
