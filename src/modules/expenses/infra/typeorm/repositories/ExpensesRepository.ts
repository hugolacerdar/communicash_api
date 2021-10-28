import { IExpensesRepository } from "../../../repositories/IExpensesRepository";
import { getRepository, Repository } from "typeorm";
import { Expense } from "../entities/Expense";
import { ICreateExpenseDTO } from "../../../dtos/ICreateExpenseDTO";

class ExpensesRepository implements IExpensesRepository {
  private repository: Repository<Expense>;

  constructor() {
    this.repository = getRepository(Expense);
  }
  async create(data: ICreateExpenseDTO): Promise<void> {
    const expense = this.repository.create(data);

    await this.repository.save(expense);
  }

  getById(id: string): Promise<Expense> {
    throw new Error("Method not implemented.");
  }
  getByUserId(userId: string): Promise<Expense[]> {
    throw new Error("Method not implemented.");
  }
  getByCommunityId(communityId: string): Promise<Expense[]> {
    throw new Error("Method not implemented.");
  }
}

export { ExpensesRepository };
