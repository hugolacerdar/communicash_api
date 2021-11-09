import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/error/AppError";
import { IIncomesRepository } from "../../repositories/IIncomesRepository";
import { ICreateIncomeDTO } from "../../dtos/ICreateIncomeDTO";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ICommunitiesRepository } from "../../../communities/repositories/ICommunitiesRepository";

@injectable()
class CreateIncomeUseCase {
  constructor(
    @inject("IncomesRepository")
    private incomesRepository: IIncomesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CommunitiesRepository")
    private communitiesRepository: ICommunitiesRepository
  ) {}

  async execute({
    user_id,
    amount,
    description,
    date,
    community_id,
  }: ICreateIncomeDTO) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError("User not found.");

    const community = await this.communitiesRepository.findById(community_id);

    if (!community) throw new AppError("Community not found.");

    await this.incomesRepository.create({
      user_id,
      amount,
      description,
      date,
      community_id,
    });
  }
}

export { CreateIncomeUseCase };
