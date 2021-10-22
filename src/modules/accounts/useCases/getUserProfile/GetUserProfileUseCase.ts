import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "../../infra/typeorm/entities/User";
import { UserMap } from "../../mappers/UserMapper";
import { AppError } from "../../../../shared/error/AppError";

@injectable()
class GetUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError("User not found!");

    const profile = UserMap.toDTO(user);

    return profile;
  }
}

export { GetUserProfileUseCase };
