import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
const CookieSession = require("cookie-session")

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
  )

  await app.listen(3000);
}
bootstrap();
