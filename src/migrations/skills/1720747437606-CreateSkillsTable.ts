import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { basicPropertiesMigration } from '../../common/database/basic-properties.migration';
import { UUID_EXTENSION } from '../../common/constants';

export class CreateSkillsTable1720747437606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(UUID_EXTENSION);

    await queryRunner.createTable(
      new Table({
        name: 'skills',
        columns: [
          ...basicPropertiesMigration,
          {
            name: 'name',
            type: 'varchar',
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
    await queryRunner.dropTable('skills');
  }
}
