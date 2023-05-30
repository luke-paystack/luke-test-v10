import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';

import { env } from './env';
import { banner } from './lib/banner';
import { Logger } from './lib/logger';
import { catchAllLoader } from './loaders/catchAllLoader';
import { datadogLoader } from './loaders/datadogLoader';
import { eventDispatchLoader } from './loaders/eventDispatchLoader';
import { expressLoader } from './loaders/expressLoader';
import { iocLoader } from './loaders/iocLoader';
import { kafkaLoader } from './loaders/kafkaLoader';
import { metricsLoader } from './loaders/metricsLoader';
import { swaggerLoader } from './loaders/swaggerLoader';
import { typeormLoader } from './loaders/typeormLoader';
import { winstonLoader } from './loaders/winstonLoader';
import { buildSwagger } from './utils/swaggerBuilder';

const log = new Logger();

if (env.isDevelopment) {
  buildSwagger();
}

const loadersArr = [
  datadogLoader,
  winstonLoader,
  iocLoader,
  eventDispatchLoader,
  expressLoader,
  metricsLoader,
  swaggerLoader,
  catchAllLoader,
];
loadersArr.push(kafkaLoader);
if (!env.db.disabled) {
  loadersArr.unshift(typeormLoader);
}

bootstrapMicroframework({
  /**
   * Loader is a place where you can configure all your modules during microframework
   * bootstrap process. All loaders are executed one by one in a sequential order.
   */
  loaders: loadersArr,
})
  .then((framework) => {
    const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
    signalTraps.map((signalType) => {
      process.once(signalType, () => framework.shutdown());
    });
    banner(log);
  })
  .catch(error => log.error('Application has crashed: ' + error));
