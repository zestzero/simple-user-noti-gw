import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskApiConfigService } from './config/taskapi.service';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [AppController],
    providers: [
        TaskApiConfigService,
        AppService,
        {
            provide: 'TASK_SERVICE',
            useFactory: (configService: TaskApiConfigService) => {
                const taskApiSvcOptions = configService.getSvcOptions();
                return ClientProxyFactory.create(taskApiSvcOptions);
            },
            inject: [TaskApiConfigService],
        },
    ],
})
export class AppModule {}
