import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterTableIncomesAddCommunityId1635346897107
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "incomes",
      new TableColumn({ name: "community_id", type: "uuid" })
    );

    await queryRunner.createForeignKey(
      "incomes",
      new TableForeignKey({
        name: "FKIncomeCommunity",
        referencedTableName: "communities",
        referencedColumnNames: ["id"],
        columnNames: ["community_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("incomes", "FKIncomeCommunity");
    await queryRunner.dropColumn("incomes", "community_id");
  }
}
