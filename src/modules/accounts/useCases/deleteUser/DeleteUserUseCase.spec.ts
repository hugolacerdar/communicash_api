import { v4 as uuid4 } from "uuid";

import { InMemoryUsersRepository } from "../../repositories/inMemory/UsersRepository";

import { DeleteUserUseCase } from "./DeleteUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let deleteUserUseCase: DeleteUserUseCase;

describe("Delete User Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    deleteUserUseCase = new DeleteUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to delete a user", async () => {
    const id = uuid4();

    const data = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
      id: id,
    };

    await inMemoryUsersRepository.create(data);

    const beforeDeleteUser = await inMemoryUsersRepository.findById(id);

    expect(beforeDeleteUser.id).toBe(id);

    await deleteUserUseCase.execute(id);

    const afterDeleteUser = await inMemoryUsersRepository.findById(id);

    expect(afterDeleteUser).toBe(undefined);
  });
});
