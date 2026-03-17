import { prisma } from "../seed";

export async function seedUser() {
  const userId = "eaab3633-8366-4ef2-8cb4-e3841c0f4702";

  const existing = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        id: userId,
        email: "admin@syntaxhub.dev",
        name: "Andrii Zub",
        role: "TEACHER",
      },
    });
  }
}
