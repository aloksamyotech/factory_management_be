import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptor/response-interceptor/response-interceptor.interceptor';
import { GlobalExceptionHandler } from './common/exception/globalException.exception';
import { LoggingInterceptor } from './common/interceptor/logs-interceptor/logs-interceptor.interceptor';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { EmployeeService } from './modules/employee/employee.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor(),
  );
  app.enableCors({
    origin: ['http://localhost:3000', 'http://139.59.19.212:4000', 'http://159.89.170.59', 'http://159.89.170.59:3000', 'http://factory.samyotech.in', 'https://factory.samyotech.in', 'factory.samyotech.in'],
    credentials: true
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionHandler(httpAdapterHost));
  app.setGlobalPrefix('api/v1');
  
  const defaultEntry = app.get(EmployeeService)
  await defaultEntry.defaultEntries()

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
