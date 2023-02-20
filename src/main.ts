import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { StatusMonitorModule } from 'nest-status-monitor';
import statusMonitorConfig from './config/statusMonitor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 注册校验管道
  app.useGlobalPipes(new ValidationPipe());
  // 设置全局路由前缀
  app.setGlobalPrefix('api');
  // 注册状态监控
  StatusMonitorModule.setUp(statusMonitorConfig);
  await app.listen(3000);
}
bootstrap();
