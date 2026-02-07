import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    await app.listen(3001, '0.0.0.0', () => {
      console.log('--- API IS LIVE ON http://127.0.0.1:3001 ---');
    });
  } catch (err) {
    console.error('--- NESTJS FAILED TO START ---');
    console.error(err);
  }
}
bootstrap();
