import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getConnection } from 'typeorm';
import { AppModule } from './app.module';

const normalizePort = (value: string): string | number => {
  var port = parseInt(value, 10);
  if (isNaN(port)) {
    return value;
  }
  if (port >= 0) {
    return port;
  }
  return 3040;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = normalizePort(process.env.PORT)
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // Check database connection
  const connection = getConnection()
  const { isConnected } = connection
  isConnected
    ? console.log(`🌨️  Database connected`)
    : console.log(`❌  Database connect error`)
  await app.listen(port, () => {
    console.log(`App is running on: ${port as string}`)
  });
}
bootstrap();
