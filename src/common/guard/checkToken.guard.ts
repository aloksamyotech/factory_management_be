import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Message } from '../constant/constant';
import { Request } from 'express';

interface CustomRequest extends Request {
  user?: any; // Adding user in req for ts
}

export class CheckToken implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('check token in guard');
    const request: CustomRequest = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers?.authorization;
    if (!authorizationHeader) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.NOT_ACCEPTABLE,
          message: Message.tokenNotFound,
          timestamp: new Date().toISOString(),
          data: [],
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const token = authorizationHeader?.startsWith('Bearer ')
      ? authorizationHeader.split(' ')[1]
      : null;
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      console.log(Message.secretKeyNotFound);
      throw new Error();
    }
    try {
      if (typeof token !== 'string') {
        return false;
      }
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      request.user = decoded;
      return true;
    } catch (err) {
      console.log(Message.invalidToken);
      return false;
    }
  }
}
