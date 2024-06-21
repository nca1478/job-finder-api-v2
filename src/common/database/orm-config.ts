import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { CreateUsersTable1718927507170 } from '../../migrations/users/1718927507170-CreateUsersTable';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity],
  synchronize: false,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  migrations: [CreateUsersTable1718927507170],
});
