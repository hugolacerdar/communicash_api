import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuid4 } from "uuid";

import { ExpenseCategory } from "../../../../modules/expenses/infra/typeorm/entities/ExpenseCategory";

export class AddExpensesCategories1635376342694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repo = await queryRunner.manager.getRepository(ExpenseCategory);

    await repo.insert([
      {
        id: uuid4(),
        title: "Housing",
        description: "Anything you pay toward keeping a roof over your head.",
      },
      {
        id: uuid4(),
        title: "Transportation",
        description: "Anything you pay toward getting from point A to B.",
      },
      {
        id: uuid4(),
        title: "Food",
        description:
          "Anything essential you pay toward keeping yourself (and maybe others) well fed.",
      },
      {
        id: uuid4(),
        title: "Utilities",
        description:
          "Any service you pay toward having things like water, electricity, heating, ventilation, internet, etc.",
      },
      {
        id: uuid4(),
        title: "Insurance",
        description: "Anything you pay toward keeping things insured.",
      },
      {
        id: uuid4(),
        title: "Medical & Healthcare",
        description:
          "Anything you pay toward maintaining your (and maybe others) health and well-being, but excluding food related expenses.",
      },
      {
        id: uuid4(),
        title: "Saving, Investing, & Debt Payments",
        description:
          "Any money you save, invest or use to pay high-interest debts.",
      },
      {
        id: uuid4(),
        title: "Personal Spending",
        description:
          "Anything you pay that could be considered a personal care or “lifestyle” expense.",
      },
      {
        id: uuid4(),
        title: "Recreation & Entertainment",
        description: "Anything you pay toward having fun.",
      },
      {
        id: uuid4(),
        title: "Miscellaneous",
        description:
          "Anything you pay that isn’t already covered in the basic budget categories.",
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const repo = await queryRunner.manager.getRepository(ExpenseCategory);

    await repo.query("DELETE FROM expenses_category");
  }
}
