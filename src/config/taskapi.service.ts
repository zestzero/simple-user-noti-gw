import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';

interface EnvironmentVariables {
    TASK_SERVICE_HOST: string;
    TASK_SERVICE_PORT: number;
    TASK_SERVICE_TIMEOUT: number;
}

@Injectable()
export class TaskApiConfigService {
    constructor(private configService: ConfigService<EnvironmentVariables>) {}

    public getSvcOptions = (): ClientOptions => {
        return {
            transport: Transport.TCP,
            options: {
                host: this.configService.get('TASK_SERVICE_HOST', {
                    infer: true,
                }),
                port: this.configService.get('TASK_SERVICE_PORT', {
                    infer: true,
                }),
            },
        };
    };

    public getTimeOut = (): number => {
        return this.configService.get('TASK_SERVICE_TIMEOUT');
    };
}
