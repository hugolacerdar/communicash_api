import { ICreateCommunityDTO } from "../dtos/ICreateCommunityDTO";
import { IFullCommunityResponse } from "../dtos/IFullCommunityResponse";
import { Community } from "../infra/typeorm/entities/Community";

interface ICommunitiesRepository {
  create(data: ICreateCommunityDTO): Promise<Community>;
  findById(id: string): Promise<Community>;
  delete(community: Community): Promise<void>;
  getIncomesAndExpenses(
    id: string
  ): Promise<Community | IFullCommunityResponse>;
}

export { ICommunitiesRepository };
