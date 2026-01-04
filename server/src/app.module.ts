import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./user/users.module";
import { CoursesModule } from "./courses/courses.module";
import { CommunityModule } from "./community/community.module";
import { PrismaModule } from "./prisma/prisma.module";

import { validateEnv } from "./common/configs/env.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validate: validateEnv,
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    CommunityModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
