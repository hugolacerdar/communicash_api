import { inject, injectable } from "tsyringe";

import { ICommunitiesRepository } from "../../repositories/ICommunitiesRepository";
import { AppError } from "../../../../shared/error/AppError";
import { IFullCommunityResponse } from "../../dtos/IFullCommunityResponse";
import { CommunityMap } from "../../mapper/CommunityMapper";

@injectable()
class GetIncomesAndExpensesUseCase {
  constructor(
    @inject("CommunitiesRepository")
    private communitiesRepository: ICommunitiesRepository
  ) {}

  async execute(id: string): Promise<IFullCommunityResponse> {
    const community = await this.communitiesRepository.getIncomesAndExpenses(
      id
    );

    if (!community) throw new AppError("Community not found.");

    const result = CommunityMap.toDTO(community);

    return result;
  }
}

export { GetIncomesAndExpensesUseCase };
