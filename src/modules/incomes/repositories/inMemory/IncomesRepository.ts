import { ICreateIncomeDTO } from "../../dtos/ICreateIncomeDTO";
import { Income } from "../../infra/typeorm/entities/Income";
import { IIncomesRepository } from "../IIncomesRepository";

class InMemoryIncomesRepository implements IIncomesRepository {
  incomes: Income[] = [];
  async create(data: ICreateIncomeDTO): Promise<void> {
    const income = new Income();

    Object.assign(income, data);

    this.incomes.push(income);
  }
  async getById(id: string): Promise<Income> {
    const income = this.incomes.find((income) => income.id === id);

    return income;
  }
  async getByUserId(userId: string): Promise<Income[]> {
    const incomes = this.incomes.filter((income) => income.user_id === userId);

    return incomes;
  }
  async getByCommunityId(communityId: string): Promise<Income[]> {
    const incomes = this.incomes.filter(
      (income) => income.community_id === communityId
    );

    return incomes;
  }
}

export { InMemoryIncomesRepository };
