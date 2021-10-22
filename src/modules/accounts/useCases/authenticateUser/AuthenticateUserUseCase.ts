import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/error/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    full_name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("Incorrect email or password");

    const {
      tokenExpiresIn,
      refreshTokenExpiresIn,
      refreshTokenExpiresInNum,
      tokenSecret,
      refreshTokenSecret,
    } = auth;

    const passwordCheck = await compare(password, user.password);

    if (!passwordCheck) {
      throw new AppError("Incorrect email or password");
    }

    const token = sign({}, tokenSecret, {
      subject: user.id,
      expiresIn: tokenExpiresIn,
    });

    const refresh_token = sign({ email }, refreshTokenSecret, {
      subject: user.id,
      expiresIn: refreshTokenExpiresIn,
    });

    const refreshTokenExpirationDate = this.dateProvider.addDays(
      refreshTokenExpiresInNum
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expiration_date: refreshTokenExpirationDate,
    });

    const authResponse: IResponse = {
      token,
      user: {
        full_name: user.full_name,
        email: user.email,
      },
      refresh_token,
    };

    return authResponse;
  }
}

export { AuthenticateUserUseCase };
