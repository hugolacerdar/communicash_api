import { ICreateCommunityDTO } from "../../dtos/ICreateCommunityDTO";
import { IFullCommunityResponse } from "../../dtos/IFullCommunityResponse";
import { Community } from "../../infra/typeorm/entities/Community";
import { ICommunitiesRepository } from "../ICommunitiesRepository";

class InMemoryCommunitiesRepository implements ICommunitiesRepository {
  communities: Community[] = [];

  async create(data: ICreateCommunityDTO): Promise<Community> {
    const community = new Community();

    Object.assign(community, data);

    this.communities.push(community);

    return community;
  }

  async findById(id: string): Promise<Community> {
    const community = this.communities.find((community) => community.id === id);
    return community;
  }

  async delete(community: Community): Promise<void> {
    this.communities.splice(this.communities.indexOf(community));
  }

  async getIncomesAndExpenses(
    id: string
  ): Promise<Community | IFullCommunityResponse> {
    throw new Error("Method not implemented.");
  }
}

export { InMemoryCommunitiesRepository };
