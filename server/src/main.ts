import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: true },
    bodyParser: false,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") ?? 5000;

  await app.listen(port);
}

bootstrap();
