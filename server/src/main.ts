import cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") ?? 5000;

  app.use(cookieParser());

  app.enableCors({
    origin: configService.get<string>("CLIENT_URL") ?? "http://localhost:5173",
    credentials: true,
  });

  await app.listen(port);
}

bootstrap();
