import { prisma } from "../seed";

export const seedRoles = async () => {
  const roles = [
    { key: "user", title: "User" },
    { key: "admin", title: "Administrator" },
    { key: "moderator", title: "Moderator" },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { key: role.key },
      update: { title: role.title },
      create: role,
    });
  }
};
