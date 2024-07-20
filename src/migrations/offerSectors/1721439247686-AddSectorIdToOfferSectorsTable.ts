import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddSectorIdToOfferSectorsTable1721439247686
  implements MigrationInterface
{
  private tableName = 'offer_sectors';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'sectorId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['sectorId'],
        referencedTableName: 'sectors',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('sectorId') !== -1,
    );
    await queryRunner.dropForeignKey(this.tableName, foreignKey);
    await queryRunner.dropColumn(this.tableName, 'sectorId');
  }
}
