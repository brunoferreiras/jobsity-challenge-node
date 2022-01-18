import { NestFactory } from '@nestjs/core';
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
  await app.listen(port);
}
bootstrap();
