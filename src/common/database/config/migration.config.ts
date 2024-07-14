import 'dotenv/config';
import * as process from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${process.cwd()}/dist/modules/**/entities/*.entity{.ts,.js}`],
  migrations: [`${process.cwd()}/dist/migrations/**/*{.ts,.js}`],
  synchronize: false,
};

const dataSource = new DataSource({ ...dataSourceOptions });

export default dataSource;
