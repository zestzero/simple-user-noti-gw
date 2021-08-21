import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IResponse } from './types/response';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('message')
    getHello(): IResponse {
        return this.appService.getHello();
    }
}
