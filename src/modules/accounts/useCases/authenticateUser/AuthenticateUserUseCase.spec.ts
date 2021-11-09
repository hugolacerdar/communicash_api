import { v4 as uuid4 } from "uuid";

import { AppError } from "../../../../shared/error/AppError";
import { InMemoryUsersRepository } from "../../repositories/inMemory/UsersRepository";
import { InMemoryUsersTokensRepository } from "../../repositories/inMemory/UsersTokensRepository";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { hash } from "bcrypt";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository;
let dateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider
    );
  });

  it("should be able to authenticate an user", async () => {
    const hashedPassword = await hash("12345", 8);

    const data = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: hashedPassword,
      birth_date: new Date("1999-12-12 00:00:00"),
    };

    await inMemoryUsersRepository.create(data);

    const result = await authenticateUserUseCase.execute({
      email: "banana@test.com",
      password: "12345",
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an user using incorrect credentials", async () => {
    const hashedPassword = await hash("12345", 8);

    const data = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: hashedPassword,
      birth_date: new Date("1999-12-12 00:00:00"),
    };

    await inMemoryUsersRepository.create(data);

    expect(
      authenticateUserUseCase.execute({
        password: "banana",
        email: "banana@test.com",
      })
    ).rejects.toEqual(new AppError("Incorrect email or password"));

    expect(
      authenticateUserUseCase.execute({
        password: "12345",
        email: "plantain@test.com",
      })
    ).rejects.toEqual(new AppError("Incorrect email or password"));
  });
});
