import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from "@nestjs/common";

import { FileValidationMiddleware } from "./middlewares/file-validation.middleware";
import { NameValidationMiddleware } from "./middlewares/name-validation.middleware";
import { SocialsValidationMiddleware } from "./middlewares/socials-validation.middleware";

import { PrismaModule } from "src/prisma/prisma.module";
import { CloudinaryProvider } from "src/common/providers/cloudinary";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TokenBlacklistModule } from "src/auth/token-blacklist.module";

@Module({
  imports: [PrismaModule, TokenBlacklistModule],
  providers: [UsersService, CloudinaryProvider],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        FileValidationMiddleware,
        NameValidationMiddleware,
        SocialsValidationMiddleware,
      )
      .forRoutes({ path: "users/me/update", method: RequestMethod.PATCH });
  }
}
