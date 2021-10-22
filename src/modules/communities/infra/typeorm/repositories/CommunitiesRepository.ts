import { Repository, getRepository } from "typeorm";

import { ICreateCommunityDTO } from "modules/communities/dtos/ICreateCommunityDTO";
import { ICommunitiesRepository } from "../../../repositories/ICommunitiesRepository";
import { Community } from "../entities/Community";

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
    const community = await this.repository.create({
      name,
      creator_id,
      description,
    });

    await this.repository.save(community);

    return community;
  }
  findById(id: string): Promise<Community> {
    throw new Error("Method not implemented.");
  }
  delete(community: Community): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { CommunitiesRepository };
