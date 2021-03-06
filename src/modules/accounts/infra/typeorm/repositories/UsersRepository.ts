import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    full_name,
    email,
    password,
    birth_date,
    id,
    community_id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      full_name,
      email,
      password,
      birth_date,
      id,
      community_id,
    });

    await this.repository.save(user);
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async delete({ id }: User): Promise<void> {
    const deleteResult = await this.repository.delete(id);
  }
}

export { UsersRepository };
