import { prisma } from "../seed";

export const seedCategories = async () => {
  const frontendGroup = await prisma.categoryGroup.findUnique({
    where: { key: "frontend" },
  });

  const backendGroup = await prisma.categoryGroup.findUnique({
    where: { key: "backend" },
  });

  if (!frontendGroup || !backendGroup) {
    throw new Error("Groups must be seeded before categories");
  }

  const categories = [
    { key: "html", title: "HTML", groupId: frontendGroup.id, order: 1 },
    { key: "css", title: "CSS", groupId: frontendGroup.id, order: 2 },
    {
      key: "javascript",
      title: "JavaScript",
      groupId: frontendGroup.id,
      order: 3,
    },
    { key: "react", title: "React", groupId: frontendGroup.id, order: 4 },
    {
      key: "typescript",
      title: "TypeScript",
      groupId: frontendGroup.id,
      order: 5,
    },
    { key: "nodejs", title: "Node.js", groupId: backendGroup.id, order: 6 },
  ];

  for (const c of categories) {
    await prisma.courseCategory.upsert({
      where: { key: c.key },
      update: {
        title: c.title,
        groupId: c.groupId,
        order: c.order,
      },
      create: {
        key: c.key,
        title: c.title,
        groupId: c.groupId,
        order: c.order,
      },
    });
  }
};
