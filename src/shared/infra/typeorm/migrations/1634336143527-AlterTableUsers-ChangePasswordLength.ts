import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableUsersChangePasswordLength1634336143527
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "password",
      new TableColumn({
        name: "password",
        type: "varchar",
        length: "255",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "password",
      new TableColumn({
        name: "password",
        type: "varchar",
        length: "32",
      })
    );
  }
}
