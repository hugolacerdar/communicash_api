import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { ICommunitiesRepository } from "../../repositories/ICommunitiesRepository";
import { IAddMember } from "../../dtos/IAddMemberDTO";
import { AppError } from "../../../../shared/error/AppError";

@injectable()
class AddMemberUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CommunitiesRepository")
    private communitiesRepository: ICommunitiesRepository
  ) {}

  async execute({
    userToAddId,
    communityMemberId,
    communityId,
  }: IAddMember): Promise<void> {
    const user = await this.usersRepository.findById(userToAddId);

    if (!user) throw new AppError("User not found.");

    if (user.community_id) {
      throw new AppError("User is already part of a community.");
    }

    user.community_id = communityId;

    await this.usersRepository.create(user);
  }
}

export { AddMemberUseCase };
