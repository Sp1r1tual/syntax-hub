import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { StringValue } from "ms";

import { FilesValidationMiddleware } from "./middlewares/files-validation.middleware";
import { CloudinaryProvider } from "src/common/providers/cloudinary";

import { PrismaModule } from "src/prisma/prisma.module";
import { CommentsController } from "./course-comments.controller";
import { CommentsService } from "./course-comments.service";

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET")!,
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRATION") as StringValue,
        },
      }),
    }),
  ],
  providers: [CommentsService, CloudinaryProvider],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CourseCommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FilesValidationMiddleware).forRoutes(CommentsController);
  }
}
