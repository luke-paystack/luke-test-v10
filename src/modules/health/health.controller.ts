import {
  Get,
  InternalServerError,
  JsonController
} from 'routing-controllers';
import { Container } from 'typedi';
import { DataSource } from 'typeorm';

import { env } from '../../env';

@JsonController('/health')
export class HealthController {

  @Get()
  public getHealth(): Promise<any> {
    const connected: DataSource = Container.get('connectionDefault');
    if (connected.isInitialized) {
      return Promise.resolve({
        name: env.app.name,
        version: env.app.version,
        description: env.app.description,
      });
    }
    return Promise.reject(new InternalServerError('cannot connect to database'));
  }
}
