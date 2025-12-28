import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function seed() {
  console.log("Seeding database...");

  const roles = [
    { key: "user", title: "User" },
    { key: "admin", title: "Administrator" },
    { key: "moderator", title: "Moderator" },
  ];

  for (const role of roles) {
    const created = await prisma.role.upsert({
      where: { key: role.key },
      update: { title: role.title },
      create: role,
    });

    console.log(`Seeded ${created.title} (${created.key})`);
  }

  console.log("Seed complete!");
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
