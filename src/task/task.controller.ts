import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, timeout } from 'rxjs';
import { CreateTask, Task } from 'src/model/task';

@Controller('api')
export class TaskController {
    constructor(@Inject('TASK_SERVICE') private client: ClientProxy) {}

    @Get('tasks')
    getTasks(): Observable<Task[]> {
        const pattern = { cmd: 'task_getAll' };
        return this.client.send<Task[]>(pattern, {}).pipe(timeout(5000));
    }

    @Post('tasks')
    createTask(@Body() task: CreateTask): Observable<Task> {
        const pattern = { cmd: 'task_create' };
        return this.client
            .send<Task, CreateTask>(pattern, task)
            .pipe(timeout(5000));
    }
}
