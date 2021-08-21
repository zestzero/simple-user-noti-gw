import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const loggerMiddleware = new LoggerMiddleware().use;
    app.use(loggerMiddleware);
    await app.listen(3000);
}
bootstrap();
