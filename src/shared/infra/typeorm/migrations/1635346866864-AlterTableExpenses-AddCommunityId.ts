import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterTableExpensesAddCommunityId1635346866864
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn(
      "expenses",
      new TableColumn({ name: "community_id", type: "uuid" })
    );

    queryRunner.createForeignKey(
      "expenses",
      new TableForeignKey({
        name: "FKExpenseCommunity",
        referencedTableName: "communities",
        referencedColumnNames: ["id"],
        columnNames: ["community_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("expenses", "FKExpenseCommunity");
    await queryRunner.dropColumn("expenses", "community_id");
  }
}
