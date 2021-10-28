import { inject, injectable } from "tsyringe";

import { IExpensesRepository } from "../../repositories/IExpensesRepository";
import { IExpensesCategoriesRepository } from "../../repositories/IExpensesCategoriesRepository";
import { ICreateExpenseDTO } from "../../dtos/ICreateExpenseDTO";
import { AppError } from "../../../../shared/error/AppError";

@injectable()
class CreateExpenseUseCase {
  constructor(
    @inject("ExpensesRepository")
    private ExpensesRepository: IExpensesRepository,
    @inject("ExpensesCategoriesRepository")
    private ExpensesCategoriesRepository: IExpensesCategoriesRepository
  ) {}

  async execute({
    user_id,
    amount,
    description,
    date,
    community_id,
    category_id,
  }: ICreateExpenseDTO) {
    const category = await this.ExpensesCategoriesRepository.findById(
      category_id
    );

    if (!category) throw new AppError("Category not found");

    await this.ExpensesRepository.create({
      user_id,
      amount,
      description,
      date,
      community_id,
      category_id,
    });
  }
}

export { CreateExpenseUseCase };
