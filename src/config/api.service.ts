import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { ServiceName } from './type';

interface EnvironmentVariables {
    TASK_SERVICE_HOST: string;
    TASK_SERVICE_PORT: number;
    TASK_SERVICE_TIMEOUT: number;
    USER_SERVICE_HOST: string;
    USER_SERVICE_PORT: number;
    USER_SERVICE_TIMEOUT: number;
}

const ConfigurationCollections: {
    [key: string]: {
        host: keyof EnvironmentVariables;
        port: keyof EnvironmentVariables;
    };
} = {
    [ServiceName.TASK]: {
        host: 'TASK_SERVICE_HOST',
        port: 'TASK_SERVICE_PORT',
    },
    [ServiceName.USER]: {
        host: 'USER_SERVICE_HOST',
        port: 'USER_SERVICE_PORT',
    },
};

@Injectable()
export class ApiConfigService {
    constructor(private configService: ConfigService<EnvironmentVariables>) {}

    public getApiSvcOptionsByService = (service: ServiceName) => {
        return this.getApiSvcOptions(
            ConfigurationCollections[service].host,
            ConfigurationCollections[service].port,
        );
    };

    private getApiSvcOptions = (
        host: keyof EnvironmentVariables,
        port: keyof EnvironmentVariables,
    ): ClientOptions => {
        return {
            transport: Transport.TCP,
            options: {
                host: this.configService.get(host, {
                    infer: true,
                }),
                port: this.configService.get(port, {
                    infer: true,
                }),
            },
        };
    };
}
