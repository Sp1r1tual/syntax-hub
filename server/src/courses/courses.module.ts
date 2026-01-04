import { Module } from "@nestjs/common";

import { JwtOptionalMiddleware } from "src/auth/middlewares/jwt-optional.middleware";

import { PrismaModule } from "src/prisma/prisma.module";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";

@Module({
  imports: [PrismaModule],
  providers: [CoursesService],
  controllers: [CoursesController],
  exports: [CoursesService],
})
export class CoursesModule {}
