import { getRepository, Repository } from "typeorm";

import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";
import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";

import { UserToken } from "../entities/UserToken";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    user_id,
    refresh_token,
    expiration_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expiration_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      user_id,
      refresh_token,
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({ refresh_token });

    return userToken;
  }
}

export { UsersTokensRepository };
