import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { basicPropertiesMigration } from '../../common/database/basic-properties.migration';
import { UUID_EXTENSION } from '../../common/constants';

export class CreateOfferSkillsTable1721437062033 implements MigrationInterface {
  private tableName = 'offer_skills';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(UUID_EXTENSION);

    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [...basicPropertiesMigration],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
