import { ICreateCommunityDTO } from "../dtos/ICreateCommunityDTO";
import { Community } from "../infra/typeorm/entities/Community";

interface ICommunitiesRepository {
  create(data: ICreateCommunityDTO): Promise<Community>;
  findById(id: string): Promise<Community>;
  delete(community: Community): Promise<void>;
}

export { ICommunitiesRepository };
