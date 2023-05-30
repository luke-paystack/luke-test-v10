import * as path from 'path';

import * as dotenv from 'dotenv';

import * as pkg from '../package.json';

import {
  getOsEnv,
  getOsEnvArray,
  getOsEnvOptional,
  getOsPathsWithDefault,
  getOsPathWithDefault,
  normalizePort,
  toBool,
  toNumber,
} from './lib/env';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`
  ),
});

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    name: (pkg as any).name,
    version: (pkg as any).version,
    description: (pkg as any).description,
    host: getOsEnvOptional('APP_HOST'),
    port: normalizePort(process.env.PORT || undefined),
    schema: getOsEnvOptional('APP_SCHEMA'),
    exposedPort: normalizePort(process.env.APP_EXPOSED_PORT || undefined),
    banner: toBool(getOsEnvOptional('APP_BANNER') || 'true'),
    dirs: {
      migrations: getOsPathsWithDefault('TYPEORM_MIGRATIONS', 'src/database/migrations/**/*.ts'),
      migrationsDir: getOsPathWithDefault('TYPEORM_MIGRATIONS_DIR', 'src/database/migrations'),
      entities: getOsPathsWithDefault('TYPEORM_ENTITIES', 'src/modules/**/*.model.ts'),
      controllers: getOsPathsWithDefault('CONTROLLERS', 'src/modules/**/*.controller.ts'),
      middlewares: getOsPathsWithDefault('MIDDLEWARES', 'src/middlewares/**/*.middleware.ts'),
      subscribers: getOsPathsWithDefault('SUBSCRIBERS', 'src/api/subscribers/**/*.subscriber.ts'),
    },
  },
  log: {
    level: getOsEnv('LOG_LEVEL'),
    json: toBool(getOsEnvOptional('LOG_JSON')),
    output: getOsEnv('LOG_OUTPUT'),
  },
  db: {
    type: getOsEnv('TYPEORM_CONNECTION'),
    url: getOsEnvOptional('TYPEORM_URL'),
    host: getOsEnvOptional('TYPEORM_HOST'),
    username: getOsEnvOptional('TYPEORM_USERNAME'),
    password: getOsEnvOptional('TYPEORM_PASSWORD'),
    port: toNumber(getOsEnvOptional('TYPEORM_PORT')),
    database: getOsEnvOptional('TYPEORM_DATABASE'),
    synchronize: toBool(getOsEnvOptional('TYPEORM_SYNCHRONIZE')),
    logging: toBool(getOsEnv('TYPEORM_LOGGING')),
    disabled: toBool(getOsEnv('TYPEORM_DISABLED')),
  },
  swagger: {
    enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
    route: getOsEnv('SWAGGER_ROUTE'),
    file: getOsEnv('SWAGGER_FILE'),
  },
  metrics: {
    datadog: {
      traceEnabled: toBool(getOsEnvOptional('DD_TRACE_ENABLED') || 'true'),
      env: getOsEnvOptional('DD_ENV') || 'prod',
      agentHost: getOsEnvOptional('DD_AGENT_HOST') || 'datadog.private.paystack.co',
      traceAgentPort: getOsEnvOptional('DD_TRACE_AGENT_PORT') || 8126,
      traceLogLevel: getOsEnvOptional('DD_TRACE_LOG_LEVEL') || 'error',
      logInjection: toBool(getOsEnvOptional('DD_LOGS_INJECTION') || 'true'),
      traceReportHostName: toBool(getOsEnvOptional('DD_TRACE_REPORT_HOSTNAME') || 'true'),
      service: getOsEnvOptional('DD_SERVICE') || 'luke-test-v10',
    },
    statsd: {
      port: toNumber(getOsEnvOptional('STATSD_PORT') || '8125'),
    }, 
  }, 
  kafka: {
    brokers: getOsEnvArray('KAFKA_BROKER_URLS'),
    clientId: getOsEnvOptional('KAFKA_CLIENT_ID') || `Test`,
    ssl: toBool(getOsEnvOptional('KAFKA_CLIENT_SSL') || 'true'),
  }
};
