import { Injectable } from '@nestjs/common';
import { IResponse } from './types/response';

@Injectable()
export class AppService {
  getHello(): IResponse {
    return { message: 'Hello From Gateway!' };
  }
}
