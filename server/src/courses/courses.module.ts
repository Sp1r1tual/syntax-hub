import { Module } from "@nestjs/common";

import { PrismaModule } from "src/prisma/prisma.module";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";

import { QuestionStatusEntity } from "./entities";

@Module({
  imports: [PrismaModule],
  providers: [CoursesService, QuestionStatusEntity],
  controllers: [CoursesController],
  exports: [CoursesService],
})
export class CoursesModule {}
