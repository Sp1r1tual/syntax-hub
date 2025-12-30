import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { seedRoles } from "./seeders/roles";
import { seedGroups } from "./seeders/groups";
import { seedCategories } from "./seeders/categories";
import { seedCourses } from "./seeders/courses";

export const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function seed() {
  console.log("Seeding roles...");
  await seedRoles();

  console.log("Seeding category groups...");
  await seedGroups();

  console.log("Seeding categories...");
  await seedCategories();

  console.log("Seeding courses, topics and questions...");
  await seedCourses();

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
