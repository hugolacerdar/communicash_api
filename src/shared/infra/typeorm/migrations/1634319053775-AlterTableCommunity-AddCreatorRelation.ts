import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterTableCommunityAddCreatorRelation1634319053775
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "communities",
      new TableColumn({
        name: "creator_id",
        type: "uuid",
      })
    );

    await queryRunner.createForeignKey(
      "communities",
      new TableForeignKey({
        name: "FKCommunityCreator",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["creator_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("communities", "FKCommunityCreator");
    await queryRunner.dropColumn("communities", "creator_id");
  }
}
