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
    const existingGroup = await prisma.categoryGroup.findUnique({
      where: { key: group.key },
    });

    if (!existingGroup) {
      await prisma.categoryGroup.create({
        data: group,
      });
    }
  }
}
