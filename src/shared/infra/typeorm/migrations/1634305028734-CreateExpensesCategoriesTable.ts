import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExpensesCategoriesTable1634305028734
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "expenses_categories",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
            length: "50",
          },
          {
            name: "description",
            type: "varchar",
            length: "255",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("categories");
  }
}
