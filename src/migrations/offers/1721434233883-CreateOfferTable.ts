import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { basicPropertiesMigration } from '../../common/database/basic-properties.migration';
import { UUID_EXTENSION } from '../../common/constants';

export class CreateOfferTable1721434233883 implements MigrationInterface {
  private tableName = 'offers';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(UUID_EXTENSION);

    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          ...basicPropertiesMigration,
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'numeric',
            default: 0,
          },
          {
            name: 'currency',
            type: 'varchar',
          },
          {
            name: 'img',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'published',
            type: 'boolean',
            default: false,
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
