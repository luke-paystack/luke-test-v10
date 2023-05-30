import { env } from '../env';
import { Logger } from '../lib/logger';

export function banner(log: Logger): void {
    if (env.app.banner) {
        const route = () => `${env.app.schema}://${env.app.host}:${env.app.exposedPort}`;
        log.info(``);
        log.info('-------------------------------------------------------');
        log.info('Microservice  : ' + env.app.name);
        log.info('Version       : ' + env.app.version);
        log.info(`Environment   : ${env.node}`);
        log.info(``);
        if (env.swagger.enabled && env.node !== 'production') {
            log.info(`Swagger       : ${route()}${env.swagger.route}`);
        }
        log.info('-------------------------------------------------------');
        log.info(`To shut it down, press <CTRL> + C at any time.`);
        log.info('');
    } else {
        log.info(`Application is up and running.`);
    }
}
