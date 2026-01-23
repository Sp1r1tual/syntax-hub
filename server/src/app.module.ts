import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./user/users.module";
import { CoursesModule } from "./courses/courses.module";
import { CommunityModule } from "./community/community.module";
import { CourseCommentsModule } from "./course-comments/course-comments.module";
import { TokenBlacklistModule } from "./auth/token-blacklist.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./redis/redis.module";

import { validateEnv } from "./common/configs/env.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validate: validateEnv,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
    AuthModule,
    UsersModule,
    CoursesModule,
    CommunityModule,
    CourseCommentsModule,
    TokenBlacklistModule,
    PrismaModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
