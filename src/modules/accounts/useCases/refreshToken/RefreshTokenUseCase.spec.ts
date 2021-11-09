import { v4 as uuid4 } from "uuid";

import { AppError } from "../../../../shared/error/AppError";
import { InMemoryUsersRepository } from "../../repositories/inMemory/UsersRepository";
import { InMemoryUsersTokensRepository } from "../../repositories/inMemory/UsersTokensRepository";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { hash } from "bcrypt";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository;
let dateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;

describe("Refresh Token", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    refreshTokenUseCase = new RefreshTokenUseCase(
      inMemoryUsersTokensRepository,
      dateProvider
    );
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider
    );
  });

  it("should be able to renew the access token", async () => {
    const hashedPassword = await hash("12345", 8);

    const data = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: hashedPassword,
      birth_date: new Date("1999-12-12 00:00:00"),
    };

    await inMemoryUsersRepository.create(data);

    const { refresh_token } = await authenticateUserUseCase.execute({
      email: "banana@test.com",
      password: "12345",
    });

    const refreshResult = await refreshTokenUseCase.execute(refresh_token);

    expect(refreshResult).toHaveProperty("token");
  });

  it("should not be able to renew the access token when the refresh token is not on found", async () => {
    const hashedPassword = await hash("12345", 8);

    const data = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: hashedPassword,
      birth_date: new Date("1999-12-12 00:00:00"),
    };

    await inMemoryUsersRepository.create(data);

    const { refresh_token } = await authenticateUserUseCase.execute({
      email: "banana@test.com",
      password: "12345",
    });

    const { id } = await inMemoryUsersTokensRepository.findByRefreshToken(
      refresh_token
    );

    await inMemoryUsersTokensRepository.deleteById(id);

    expect(refreshTokenUseCase.execute(refresh_token)).rejects.toEqual(
      new AppError("Refresh Token does not exist!")
    );
  });
});
