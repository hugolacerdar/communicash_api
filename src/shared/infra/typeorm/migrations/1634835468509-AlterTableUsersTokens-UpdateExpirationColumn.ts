import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableUsersTokensUpdateExpirationColumn1634835468509
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users_tokens",
      "expires_date",
      new TableColumn({
        name: "expiration_date",
        type: "timestamp",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users_tokens",
      "expiration_date",
      new TableColumn({
        name: "expires_date",
        type: "timestamp",
      })
    );
  }
}
