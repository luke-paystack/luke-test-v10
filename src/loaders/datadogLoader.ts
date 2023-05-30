import { tracer } from 'dd-trace';
import { MicroframeworkLoader } from 'microframework-w3tec';

import { env } from '../env';

export const datadogLoader: MicroframeworkLoader = () => {

  tracer.init({
    env: env.metrics.datadog.env,
    hostname: env.metrics.datadog.agentHost,
    port: env.metrics.datadog.traceAgentPort,
    logLevel: env.metrics.datadog.traceLogLevel as 'error' | 'debug',
    logInjection: env.metrics.datadog.logInjection,
    reportHostname: env.metrics.datadog.traceReportHostName,
    service: env.metrics.datadog.service,
  });
};
