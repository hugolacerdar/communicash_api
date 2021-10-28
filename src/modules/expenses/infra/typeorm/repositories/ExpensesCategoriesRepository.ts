import { IExpensesCategoriesRepository } from "modules/expenses/repositories/IExpensesCategoriesRepository";
import { getRepository, Repository } from "typeorm";
import { ExpenseCategory } from "../entities/ExpenseCategory";

class ExpensesCategoriesRepository implements IExpensesCategoriesRepository {
  private repository: Repository<ExpenseCategory>;

  constructor() {
    this.repository = getRepository(ExpenseCategory);
  }
  async findById(id: string): Promise<ExpenseCategory> {
    const category = await this.repository.findOne(id);

    return category;
  }
  async getAll(): Promise<ExpenseCategory[]> {
    const categories = this.repository.find();

    return categories;
  }
}

export { ExpensesCategoriesRepository };
