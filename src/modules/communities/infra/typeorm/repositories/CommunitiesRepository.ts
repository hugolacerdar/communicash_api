import { Repository, getRepository } from "typeorm";

import { ICreateCommunityDTO } from "../../../../communities/dtos/ICreateCommunityDTO";
import { ICommunitiesRepository } from "../../../repositories/ICommunitiesRepository";
import { Community } from "../entities/Community";
import { IFullCommunityResponse } from "../../../dtos/IFullCommunityResponse";

class CommunitiesRepository implements ICommunitiesRepository {
  private repository: Repository<Community>;

  constructor() {
    this.repository = getRepository(Community);
  }

  async create({
    name,
    creator_id,
    description,
  }: ICreateCommunityDTO): Promise<Community> {
    const community = this.repository.create({
      name,
      creator_id,
      description,
    });

    await this.repository.save(community);

    return community;
  }

  findById(id: string): Promise<Community> {
    const community = this.repository.findOne(id);

    return community;
  }
  delete(community: Community): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getIncomesAndExpenses(
    id: string
  ): Promise<Community | IFullCommunityResponse> {
    const community = (await this.repository.findOne(id, {
      relations: [
        "incomes",
        "incomes.user",
        "expenses",
        "expenses.user",
        "expenses.category",
      ],
    })) as Community | IFullCommunityResponse;

    return community;
  }
}

export { CommunitiesRepository };
