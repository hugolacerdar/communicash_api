import { IExpensesRepository } from "../IExpensesRepository";
import { ICreateExpenseDTO } from "../../dtos/ICreateExpenseDTO";
import { Expense } from "../../infra/typeorm/entities/Expense";

class InMemoryExpensesRepository implements IExpensesRepository {
  expenses: Expense[] = [];

  async create(data: ICreateExpenseDTO): Promise<void> {
    const expense = new Expense();

    Object.assign(expense, data);

    this.expenses.push(expense);
  }

  async getById(id: string): Promise<Expense> {
    const expense = this.expenses.find((e) => e.id === id);

    return expense;
  }

  async getByUserId(userId: string): Promise<Expense[]> {
    const expenses = this.expenses.filter((e) => e.user_id === userId);

    return expenses;
  }

  async getByCommunityId(communityId: string): Promise<Expense[]> {
    const expenses = this.expenses.filter(
      (e) => e.community_id === communityId
    );

    return expenses;
  }
}

export { InMemoryExpensesRepository };
