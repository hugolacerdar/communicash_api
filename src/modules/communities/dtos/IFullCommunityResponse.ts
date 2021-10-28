import { IUserResponseDTO } from "../../accounts/dtos/IUserResponseDTO";
import { ExpenseCategory } from "../../expenses/infra/typeorm/entities/ExpenseCategory";

interface IFullCommunityResponse {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  created_at: Date;
  incomes: {
    id: string;
    user_id: string;
    community_id: string;
    date: Date;
    description: string;
    amount: number;
    user: IUserResponseDTO;
  }[];
  expenses: {
    id: string;
    user_id: string;
    community_id: string;
    category_id: string;
    date: Date;
    description: string;
    amount: number;
    user: IUserResponseDTO;
    category: ExpenseCategory;
  }[];
}

export { IFullCommunityResponse };
