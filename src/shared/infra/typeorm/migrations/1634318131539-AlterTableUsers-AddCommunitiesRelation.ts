import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterTableUsersAddCommunitiesRelation1634318131539
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "community_id",
        type: "uuid",
      })
    );

    await queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        name: "FKUserCommunity",
        referencedTableName: "communities",
        referencedColumnNames: ["id"],
        columnNames: ["community_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users", "FKUserCommunity");
    await queryRunner.dropColumn("users", "community_id");
  }
}
