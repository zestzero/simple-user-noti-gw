import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, timeout } from 'rxjs';
import { AppService } from './app.service';
import { Task } from './model/task';
import { IResponse } from './types/response';

@Controller('api')
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('TASK_SERVICE') private client: ClientProxy,
    ) {}

    @Get('message')
    getHello(): IResponse {
        return this.appService.getHello();
    }

    @Get('tasks')
    getTasks(): Observable<Task[]> {
        const pattern = { cmd: 'getAllTasks' };
        return this.client.send<Task[]>(pattern, {}).pipe(timeout(5000));
    }
}
