
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import Container from 'typedi';
import { DataSource } from 'typeorm';

import { env } from '../env';

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
  const appDataStore = new DataSource({
    type: env.db.type as any,
    url: env.db.url,
    port: env.db.port,
    synchronize: env.db.synchronize,
    logging: env.db.logging,
    entities: env.app.dirs.entities,
    migrations: env.app.dirs.migrations,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  appDataStore.initialize()
    .then(async() => {
      Container.set('connectionDefault', appDataStore);
      const migrations = await appDataStore.manager.connection.runMigrations();
      migrations.forEach(e => {
        console.log(`Migration completed: ${e.name}`);
      });
      if (settings) {
        Container.set('connectionDefault', appDataStore);
        settings.onShutdown(() => appDataStore.manager.connection.destroy());
      }
    }).catch(err => {
      console.log(`Error connecting to DB ${err}`);
    });
}
