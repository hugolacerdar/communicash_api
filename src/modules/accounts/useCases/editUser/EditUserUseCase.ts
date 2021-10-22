import { inject, injectable } from "tsyringe";

import { IEditUserDTO } from "../../../accounts/dtos/IEditUserDTO";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { AppError } from "../../../../shared/error/AppError";

@injectable()
class EditUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ full_name, id }: IEditUserDTO): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError("User not found");

    await this.usersRepository.create({ ...user, full_name });
  }
}

export { EditUserUseCase };
