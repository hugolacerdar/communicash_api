import { IExpensesCategoriesRepository } from "../../repositories/IExpensesCategoriesRepository";
import { inject, injectable } from "tsyringe";

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
