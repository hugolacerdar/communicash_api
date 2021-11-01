import { InMemoryUsersRepository } from "../../repositories/inMemory/UsersRepository";
import { AppError } from "../../../../shared/error/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const data = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
    };

    await createUserUseCase.execute(data);

    const user = await inMemoryUsersRepository.findByEmail(data.email);

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a user with an email that is already registered on the platform", async () => {
    const data = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
    };

    await createUserUseCase.execute(data);

    expect(createUserUseCase.execute(data)).rejects.toEqual(
      new AppError("User already exists")
    );
  });
});
