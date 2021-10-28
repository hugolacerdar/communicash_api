import { ICreateIncomeDTO } from "../../../dtos/ICreateIncomeDTO";
import { getRepository, Repository } from "typeorm";
import { IIncomesRepository } from "../../../repositories/IIncomesRepositories";
import { Income } from "../entities/Income";

class IncomesRepository implements IIncomesRepository {
  private repository: Repository<Income>;

  constructor() {
    this.repository = getRepository(Income);
  }
  async create({
    id,
    user_id,
    description,
    date,
    amount,
    community_id,
  }: ICreateIncomeDTO): Promise<void> {
    const income = await this.repository.create({
      id,
      user_id,
      description,
      date,
      amount,
      community_id,
    });

    await this.repository.save(income);
  }

  getById(id: string): Promise<Income> {
    throw new Error("Method not implemented.");
  }

  getByUserId(userId: string): Promise<Income[]> {
    throw new Error("Method not implemented.");
  }

  getByCommunityId(communityId: string): Promise<Income[]> {
    throw new Error("Method not implemented.");
  }
}

export { IncomesRepository };
