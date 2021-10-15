import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExpensesTable1634305080140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "expenses",
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
            name: "category_id",
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
            name: "FKUserExpense",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKExpenseCategory",
            referencedTableName: "expenses_categories",
            referencedColumnNames: ["id"],
            columnNames: ["category_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("expenses");
  }
}
