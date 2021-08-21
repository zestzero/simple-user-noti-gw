import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiConfigService } from './config/api.service';
import { ServiceName } from './config/type';
import { TaskController } from './task/task.controller';
import { UserController } from './user/user.controller';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [AppController, TaskController, UserController],
    providers: [
        ApiConfigService,
        AppService,
        {
            provide: 'TASK_SERVICE',
            useFactory: (configService: ApiConfigService) => {
                const taskApiSvcOptions =
                    configService.getApiSvcOptionsByService(ServiceName.TASK);
                return ClientProxyFactory.create(taskApiSvcOptions);
            },
            inject: [ApiConfigService],
        },
        {
            provide: 'USER_SERVICE',
            useFactory: (configService: ApiConfigService) => {
                const userApiSvcOptions =
                    configService.getApiSvcOptionsByService(ServiceName.USER);
                return ClientProxyFactory.create(userApiSvcOptions);
            },
            inject: [ApiConfigService],
        },
    ],
})
export class AppModule {}
