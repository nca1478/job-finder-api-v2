import 'dotenv/config';
import * as process from 'process';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';
import InitSeeder from '../seeds/init.seeder';

const isSSLEnabled = process.env.DB_SSL_ENABLED === 'true';
const isRejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true';

const options = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(String(process.env.DB_PORT), 10) || 5433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../../../modules/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../../migrations/**/*{.ts,.js}'],
  ssl: isSSLEnabled ? { rejectUnauthorized: isRejectUnauthorized } : false,
  seeds: [InitSeeder],
};

export const source = new DataSource(
  options as DataSourceOptions & SeederOptions,
);
