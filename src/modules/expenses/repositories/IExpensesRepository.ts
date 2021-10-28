import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";
import { Expense } from "../infra/typeorm/entities/Expense";

interface IExpensesRepository {
  create(data: ICreateExpenseDTO): Promise<void>;
  getById(id: string): Promise<Expense>;
  getByUserId(userId: string): Promise<Expense[]>;
  getByCommunityId(communityId: string): Promise<Expense[]>;
}

export { IExpensesRepository };
