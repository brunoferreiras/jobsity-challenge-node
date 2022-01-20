import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getConnection } from 'typeorm';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3040;
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  setupSwagger(app);
  // Check database connection
  const connection = getConnection();
  const { isConnected } = connection;
  isConnected
    ? Logger.log(`🌨️  Database connected`)
    : Logger.log(`❌  Database connect error`);
  await app.listen(port, () => {
    Logger.log(`App is running on: ${port as string}`);
  });
}
bootstrap();
