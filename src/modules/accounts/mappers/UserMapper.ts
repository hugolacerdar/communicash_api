import { classToClass } from "class-transformer";

import { User } from "../infra/typeorm/entities/User";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

class UserMap {
  static toDTO({
    id,
    full_name,
    email,
    birth_date,
    created_at,
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      full_name,
      email,
      birth_date,
      created_at,
    });

    return user;
  }
}

export { UserMap };
