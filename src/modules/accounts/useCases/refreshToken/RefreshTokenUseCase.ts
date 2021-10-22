import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";

import auth from "../../../../config/auth";

import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/error/AppError";

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.refreshTokenSecret) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) throw new AppError("Refresh Token does not exist!");

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.refreshTokenSecret, {
      subject: sub,
      expiresIn: auth.refreshTokenExpiresIn,
    });

    const expiration_date = this.dateProvider.addDays(
      auth.refreshTokenExpiresInNum
    );

    await this.usersTokensRepository.create({
      expiration_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, auth.tokenSecret, {
      subject: user_id,
      expiresIn: auth.tokenExpiresIn,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };
