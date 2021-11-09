import { v4 as uuid4 } from "uuid";

import { AppError } from "../../../../shared/error/AppError";
import { InMemoryUsersRepository } from "../../repositories/inMemory/UsersRepository";

import { EditUserUseCase } from "./EditUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let editUserUseCase: EditUserUseCase;

describe("Edit User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    editUserUseCase = new EditUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to edit the user", async () => {
    const id = uuid4();

    const data = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
      id: id,
    };

    await inMemoryUsersRepository.create(data);

    await editUserUseCase.execute({ full_name: "Banana Supertest", id });

    const user = await inMemoryUsersRepository.findById(id);

    expect(user.full_name).toBe("Banana Supertest");
  });

  it("should not be able to edit a not found user", async () => {
    const id = uuid4();

    expect(
      editUserUseCase.execute({ full_name: "Banana Supertest", id })
    ).rejects.toEqual(new AppError("User not found"));
  });
});
