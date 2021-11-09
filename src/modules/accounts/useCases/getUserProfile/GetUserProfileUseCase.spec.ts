import { v4 as uuid4 } from "uuid";

import { InMemoryUsersRepository } from "../../repositories/inMemory/UsersRepository";

import { GetUserProfileUseCase } from "./GetUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("Get User Profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should be able to get the user", async () => {
    const id = uuid4();

    const data = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
      id: id,
    };

    await inMemoryUsersRepository.create(data);

    const user = await getUserProfileUseCase.execute(id);

    expect(user).toHaveProperty("id");
    expect(user.id).toEqual(id);
  });
});
