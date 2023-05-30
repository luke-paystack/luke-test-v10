
import { MongoMemoryServer } from 'mongodb-memory-server';
import { DataSource } from 'typeorm';

import { env } from '../env';

export const createDatabaseConnection = async (): Promise<DataSource> => {

    const mongoServer = await MongoMemoryServer.create();

    const conn =  new DataSource({
        type: env.db.type as any, // See createConnection options for valid types
        url: mongoServer.getUri(),
        logging: true,
        entities: env.app.dirs.entities,
        migrations: env.app.dirs.migrations,
        useUnifiedTopology: true,
    });

    await conn.initialize();
    return conn;
};

export const dropDatabase = (conn: DataSource) => {
    return conn.dropDatabase();
};

export const migrateDatabase = (conn: DataSource) => {
    return conn.runMigrations();
};

export const closeDatabase = (conn: DataSource) => {
    return conn.destroy();
};
