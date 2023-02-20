import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 这个拦截器需要打磨一下
    // return next.handle().pipe(
    //   map((data) => {
    //     return {
    //       data,
    //       code: 200,
    //       msg: '请求成功',
    //     };
    //   }),
    // );
    return next.handle();
  }
}
