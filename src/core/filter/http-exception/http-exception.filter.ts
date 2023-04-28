import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码

    const message = exception.message // 设置错误信息
      ? exception.message
      : `${status >= 500 ? '系统错误，请联系it客服' : 'Client Error'}`;
    const code = status >= 500 ? 500 : status;
    const errorResponse = {
      data: {},
      message: message,
      code,
    };
    // const message = exception.message
    // response
    //   .status(status)
    //   .json({
    //     code: status,
    //     message: status >= 500 ? '系统错误，请联系it客服' : message,
    //   });
    console.log(message, 'message');

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
