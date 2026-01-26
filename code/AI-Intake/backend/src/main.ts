import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Use env-based CORS (works for local + production)
  const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim());

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // ✅ Global prefix
  app.setGlobalPrefix('ai-intake');

  // ✅ Render-compatible port binding
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
}

bootstrap();
