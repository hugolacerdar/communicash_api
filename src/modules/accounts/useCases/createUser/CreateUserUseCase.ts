import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../../accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { AppError } from "../../../../shared/error/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    full_name,
    email,
    password,
    birth_date,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError("User already exists");

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      full_name,
      email,
      birth_date,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
