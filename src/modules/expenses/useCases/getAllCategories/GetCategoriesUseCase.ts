import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IExpensesCategoriesRepository } from "../../repositories/IExpensesCategoriesRepository";

@injectable()
class GetCategoriesUseCase {
  constructor(
    @inject("ExpensesCategoriesRepository")
    private expensesCategoriesRepository: IExpensesCategoriesRepository
  ) {}

  async execute() {
    const categories = await this.expensesCategoriesRepository.getAll();

    return categories;
  }
}

export { GetCategoriesUseCase };
