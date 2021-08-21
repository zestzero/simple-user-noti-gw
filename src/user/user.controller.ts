import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, timeout } from 'rxjs';
import { CreateUser, User } from 'src/model/user';

@Controller('api')
export class UserController {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

    @Get('users')
    getUsers(): Observable<User[]> {
        const pattern = { cmd: 'user_getAll' };
        return this.client.send<User[]>(pattern, {}).pipe(timeout(5000));
    }

    @Post('users')
    createUsers(@Body() user: CreateUser): Observable<User> {
        const pattern = { cmd: 'user_create' };
        return this.client
            .send<User, CreateUser>(pattern, user)
            .pipe(timeout(5000));
    }
}
