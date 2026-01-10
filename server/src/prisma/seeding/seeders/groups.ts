import { prisma } from "../seed";

export async function seedGroups() {
  const groups = [
    {
      key: "frontend",
      title: "Frontend",
      order: 1,
    },
  ];

  for (const group of groups) {
    await prisma.categoryGroup.upsert({
      where: { key: group.key },
      update: {
        title: group.title,
        order: group.order,
      },
      create: group,
    });
  }
}
