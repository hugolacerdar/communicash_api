import { ICreateIncomeDTO } from "../dtos/ICreateIncomeDTO";
import { Income } from "../infra/typeorm/entities/Income";

interface IIncomesRepository {
  create(data: ICreateIncomeDTO): Promise<void>;
  getById(id: string): Promise<Income>;
  getByUserId(userId: string): Promise<Income[]>;
  getByCommunityId(communityId: string): Promise<Income[]>;
}

export { IIncomesRepository };
