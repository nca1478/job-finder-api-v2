import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddOfferIdToOfferSkillsTable1721437423316
  implements MigrationInterface
{
  private tableName = 'offer_skills';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'offerId',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['offerId'],
        referencedTableName: 'offers',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('offerId') !== -1,
    );
    await queryRunner.dropForeignKey(this.tableName, foreignKey);
    await queryRunner.dropColumn(this.tableName, 'offerId');
  }
}
