// Migraciones con: "npm run migration:run"
import 'dotenv/config';
import * as process from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';

// import * as dotenv from 'dotenv';
// const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;
// dotenv.config({ path: envFile });

const isSSLEnabled = process.env.DB_SSL_ENABLED === 'true';
const isRejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${process.cwd()}/dist/modules/**/entities/*.entity{.ts,.js}`],
  migrations: [`${process.cwd()}/dist/migrations/**/*{.ts,.js}`],
  ssl: isSSLEnabled ? { rejectUnauthorized: isRejectUnauthorized } : false,
  synchronize: false,
};

const dataSource = new DataSource({ ...dataSourceOptions });

export default dataSource;
