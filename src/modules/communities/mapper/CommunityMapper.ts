import { UserMap } from "../../accounts/mappers/UserMapper";
import { IFullCommunityResponse } from "../dtos/IFullCommunityResponse";
import { Community } from "../infra/typeorm/entities/Community";

class CommunityMap {
  static toDTO(community: Community | IFullCommunityResponse) {
    community.expenses = community.expenses.map((expense) => {
      return {
        ...expense,
        user: UserMap.toDTO(expense.user),
      };
    });

    community.incomes = community.incomes.map((income) => {
      return {
        ...income,
        user: UserMap.toDTO(income.user),
      };
    });

    return community;
  }
}

export { CommunityMap };
