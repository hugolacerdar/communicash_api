import { ICommunitiesRepository } from "../../repositories/ICommunitiesRepository";
import { inject, injectable } from "tsyringe";
import { ICreateCommunityDTO } from "../../dtos/ICreateCommunityDTO";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { AppError } from "../../../../shared/error/AppError";

@injectable()
class CreateCommunityUseCase {
  constructor(
    @inject("CommunitiesRepository")
    private communitiesRepository: ICommunitiesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    creator_id,
    description,
  }: ICreateCommunityDTO): Promise<void> {
    const user = await this.usersRepository.findById(creator_id);

    if (user.community_id) {
      throw new AppError("You already are part of a community");
    }

    const community = await this.communitiesRepository.create({
      name,
      creator_id,
      description,
    });

    await this.usersRepository.create({ ...user, community_id: community.id });
  }
}

export { CreateCommunityUseCase };
