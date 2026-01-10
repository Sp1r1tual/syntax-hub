import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { seedGroups } from "./seeders/groups";
import { seedCourses } from "./seeders/courses";
import { seedNews } from "./seeders/news";

export const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function seed() {
  console.log("Seeding courses groups...");
  await seedGroups();

  console.log("Seeding courses, topics and questions...");
  await seedCourses();

  console.log("Seeding news...");
  await seedNews();

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
