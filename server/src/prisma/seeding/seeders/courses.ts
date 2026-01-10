import { prisma } from "../seed";
import { coursesData } from "./data/courses";

export async function seedCourses() {
  for (const courseData of coursesData) {
    const group = await prisma.categoryGroup.findUnique({
      where: { key: courseData.groupKey },
    });

    if (!group) continue;

    const existingCourse = await prisma.course.findUnique({
      where: { slug: courseData.slug },
    });

    if (existingCourse) {
      await prisma.question.deleteMany({
        where: { topic: { courseId: existingCourse.id } },
      });

      await prisma.topic.deleteMany({
        where: { courseId: existingCourse.id },
      });

      await prisma.course.delete({
        where: { id: existingCourse.id },
      });
    }

    await prisma.course.create({
      data: {
        slug: courseData.slug,
        title: courseData.title,
        description: courseData.description,
        icon: courseData.icon,
        groupId: group.id,
        order: courseData.order,
        topics: {
          create: courseData.topics.map((topic) => ({
            title: topic.title,
            order: topic.order,
            questions: {
              create: topic.questions.map((question) => ({
                text: question.text,
                order: question.order,
                content: question.content,
              })),
            },
          })),
        },
      },
    });
  }
}
