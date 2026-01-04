import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { StringValue } from "ms";

import { JwtOptionalMiddleware } from "src/auth/middlewares/jwt-optional.middleware";

import { PrismaModule } from "src/prisma/prisma.module";
import { CommunityController } from "./community.controller";
import { CommunityService } from "./community.service";

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
  providers: [CommunityService, JwtOptionalMiddleware],
  controllers: [CommunityController],
  exports: [CommunityService],
})
export class CommunityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtOptionalMiddleware).forRoutes(CommunityController);
  }
}
