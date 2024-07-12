import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { basicPropertiesMigration } from '../../common/database/basic-properties.migration';
import { UUID_EXTENSION } from '../../common/constants';

export class CreateSectorsTable1720822559796 implements MigrationInterface {
  private tableName = 'sectors';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(UUID_EXTENSION);

    await queryRunner.createTable(
      new Table({
        name: this.tableName,
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
    await queryRunner.dropTable(this.tableName);
  }
}
