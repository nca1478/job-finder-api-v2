import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddSkillIdToOfferSkillsTable1721437833701
  implements MigrationInterface
{
  private tableName = 'offer_skills';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'skillId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['skillId'],
        referencedTableName: 'skills',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('skillId') !== -1,
    );
    await queryRunner.dropForeignKey(this.tableName, foreignKey);
    await queryRunner.dropColumn(this.tableName, 'skillId');
  }
}
