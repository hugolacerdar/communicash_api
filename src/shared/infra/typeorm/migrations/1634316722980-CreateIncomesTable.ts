import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateIncomesTable1634316722980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "incomes",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "date",
            type: "timestamp",
          },
          {
            name: "description",
            type: "varchar",
            length: "255",
          },
          {
            name: "amount",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserIncome",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("incomes");
  }
}
