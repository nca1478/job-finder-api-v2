import 'dotenv/config';
import * as process from 'process';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';
import InitSeeder from '../seeds/init.seeder';

// Para migraciones: "npm run mig:gen"
const options = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../../../modules/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  seeds: [InitSeeder],
};

export const source = new DataSource(
  options as DataSourceOptions & SeederOptions,
);
