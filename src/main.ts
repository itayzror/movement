import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './config/swagger.config';

const ALLOWED_ORIGINS = ["http://www.google.com", "http://www.facebook.com"];
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createSwaggerDocument(app);
  app.enableCors({
    origin: ALLOWED_ORIGINS, 
    credentials: true, 
  })
  await app.listen(PORT);
}
bootstrap();
