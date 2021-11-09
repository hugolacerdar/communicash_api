import { v4 as uuid4 } from "uuid";

import { CreateIncomeUseCase } from "./CreateIncomeUseCase";

import { AppError } from "../../../../shared/error/AppError";
import { InMemoryIncomesRepository } from "../../repositories/inMemory/IncomesRepository";
import { InMemoryUsersRepository } from "../../../accounts/repositories/inMemory/UsersRepository";
import { InMemoryCommunitiesRepository } from "../../../communities/repositories/inMemory/CommunitiesRepository";

let createIncomeUseCase: CreateIncomeUseCase;
let inMemoryIncomesRepository: InMemoryIncomesRepository;
let inMemoryCommunitiesRepository: InMemoryCommunitiesRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create Income", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryCommunitiesRepository = new InMemoryCommunitiesRepository();
    inMemoryIncomesRepository = new InMemoryIncomesRepository();
    createIncomeUseCase = new CreateIncomeUseCase(
      inMemoryIncomesRepository,
      inMemoryUsersRepository,
      inMemoryCommunitiesRepository
    );
  });

  it("should be able create an income", async () => {
    const userId = uuid4();
    const userData = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
      id: userId,
    };

    const communityId = uuid4();
    const communityData = {
      name: "Banana Community",
      creator_id: userId,
      description: "Banana fam community",
      id: communityId,
    };

    await inMemoryUsersRepository.create({
      ...userData,
      community_id: communityId,
    });

    await inMemoryCommunitiesRepository.create(communityData);

    await createIncomeUseCase.execute({
      user_id: userId,
      amount: 1000,
      description: "Freelance",
      date: new Date(Date.now()),
      community_id: communityId,
    });

    const [income] = await inMemoryIncomesRepository.getByUserId(userId);

    expect(income).toHaveProperty("id");
  });

  it("should not be able create an income if the user is not found", async () => {
    const userId = uuid4();
    const userData = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
      id: userId,
    };

    const communityId = uuid4();
    const communityData = {
      name: "Banana Community",
      creator_id: userId,
      description: "Banana fam community",
      id: communityId,
    };

    await inMemoryUsersRepository.create({
      ...userData,
      community_id: communityId,
    });
    await inMemoryCommunitiesRepository.create(communityData);

    expect(
      createIncomeUseCase.execute({
        user_id: userId,
        amount: 1000,
        description: "Freelance",
        date: new Date(Date.now()),
        community_id: communityId,
      })
    ).rejects.toEqual(new AppError("User not found."));
  });

  it("should not be able create an income if the community is not found", async () => {
    const userId = uuid4();
    const userData = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
      id: userId,
    };

    expect(
      createIncomeUseCase.execute({
        user_id: userId,
        amount: 1000,
        description: "Freelance",
        date: new Date(Date.now()),
        community_id: uuid4(),
      })
    ).rejects.toEqual(new AppError("Community not found."));
  });
});
