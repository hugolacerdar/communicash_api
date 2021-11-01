import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async delete(user: User): Promise<void> {
    const userIndex = this.users.indexOf(user);

    this.users.splice(userIndex, 1);
  }
}

export { InMemoryUsersRepository };
