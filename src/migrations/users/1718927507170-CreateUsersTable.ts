import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { roleEnum } from '../../modules/users/models/user.model';
import { basicPropertiesMigration } from '../../common/database/basic-properties.migration';

export class CreateUsersTable1718927507170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          ...basicPropertiesMigration,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'enum',
            enum: Object.values(roleEnum),
          },
          {
            name: 'img',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'google',
            type: 'boolean',
            default: false,
          },
          {
            name: 'facebook',
            type: 'boolean',
            default: false,
          },
          {
            name: 'tokenRecovery',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'birthday',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'profession',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'education',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cvUrl',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'linkedinUser',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'twitterUser',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'instagramUser',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'facebookUser',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
