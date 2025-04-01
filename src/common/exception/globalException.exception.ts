import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Message } from "../constant/constant";

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        let status = HttpStatus.BAD_REQUEST;
        let message = Message.serverError

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();

            const { message: msg } = res as any;
            if (Array.isArray(msg)) {
                message = msg.join(", ");
            } else {
                message = exception.message;
            }
        }
        const { httpAdapter } = this.httpAdapterHost;
        const payload = {
            success: false,
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            data: []
        }
        httpAdapter.reply(ctx.getResponse(), payload, status);
    }
}