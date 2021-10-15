import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableUsersMakeColumnNullable1634319100242
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "community_id",
      new TableColumn({
        name: "community_id",
        type: "uuid",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "community_id",
      new TableColumn({
        name: "community_id",
        type: "uuid",
        isNullable: false,
      })
    );
  }
}
