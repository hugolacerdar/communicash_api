import { ExpenseCategory } from "../infra/typeorm/entities/ExpenseCategory";

interface IExpensesCategoriesRepository {
  findById(id: string): Promise<ExpenseCategory>;
  getAll(): Promise<ExpenseCategory[]>;
}

export { IExpensesCategoriesRepository };
