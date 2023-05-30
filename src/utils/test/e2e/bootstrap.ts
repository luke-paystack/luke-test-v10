import * as http from 'http';

import { Application } from 'express';
import { bootstrapMicroframework } from 'microframework-w3tec';
import { DataSource } from 'typeorm';

import { catchAllLoader } from '../../../loaders/catchAllLoader';
import { eventDispatchLoader } from '../../../loaders/eventDispatchLoader';
import { expressLoader } from '../../../loaders/expressLoader';
import { iocLoader } from '../../../loaders/iocLoader';
import { metricsLoader } from '../../../loaders/metricsLoader';
import { winstonLoader } from '../../../loaders/winstonLoader';

import { typeormLoader } from './typeormLoader';

import { kafkaLoader } from './kafkaLoader';

export interface BootstrapSettings {
    app: Application;
    server: http.Server;
    connection: DataSource;
}

export const bootstrapApp = async (): Promise<BootstrapSettings> => {
    return bootstrapMicroframework({
        loaders: [
            winstonLoader,
            iocLoader,
            eventDispatchLoader,
            typeormLoader,
            kafkaLoader,
            metricsLoader,
            expressLoader,
            catchAllLoader,
        ],
    }).then((framework) => {
        return {
            app: framework.settings.getData('express_app') as Application,
            server: framework.settings.getData('express_server') as http.Server,
            connection: framework.settings.getData('connection') as DataSource,
        } as BootstrapSettings;

    });
};
