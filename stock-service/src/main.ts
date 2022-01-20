import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  setupSwagger(app);
  
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    Logger.log(`Start application on: ${port}`);
  });
}
bootstrap();
