import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1634236217297 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "full_name",
            type: "varchar",
            length: "50",
          },
          {
            name: "email",
            type: "varchar",
            length: "50",
          },
          {
            name: "password",
            type: "varchar",
            length: "32",
          },
          {
            name: "birth_date",
            type: "date",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
