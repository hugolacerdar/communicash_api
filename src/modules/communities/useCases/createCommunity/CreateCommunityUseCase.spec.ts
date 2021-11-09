import { v4 as uuid4 } from "uuid";

import { AppError } from "../../../../shared/error/AppError";
import { InMemoryCommunitiesRepository } from "../../repositories/inMemory/CommunitiesRepository";
import { InMemoryUsersRepository } from "../../../accounts/repositories/inMemory/UsersRepository";

import { CreateCommunityUseCase } from "./CreateCommunityUseCase";

let createCommunityUseCase: CreateCommunityUseCase;
let inMemoryCommunitiesRepository: InMemoryCommunitiesRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create Community", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryCommunitiesRepository = new InMemoryCommunitiesRepository();
    createCommunityUseCase = new CreateCommunityUseCase(
      inMemoryCommunitiesRepository,
      inMemoryUsersRepository
    );
  });

  it("should be able to create a community", async () => {
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

    await inMemoryUsersRepository.create(userData);

    await createCommunityUseCase.execute(communityData);

    const community = await inMemoryCommunitiesRepository.findById(communityId);

    expect(community.name).toBe("Banana Community");
  });

  it("should not be able to create a community if the creator is already part of a community", async () => {
    const userId = uuid4();
    const userData = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
      id: userId,
    };

    const communityId = uuid4();
    const community1Data = {
      name: "Banana Community",
      creator_id: userId,
      description: "Banana fam community",
      id: communityId,
    };
    const community2Data = {
      name: "Plantain Community",
      creator_id: userId,
      description: "Plantain fam community",
    };

    await inMemoryUsersRepository.create(userData);

    await createCommunityUseCase.execute(community1Data);

    expect(createCommunityUseCase.execute(community2Data)).rejects.toEqual(
      new AppError("You already are part of a community")
    );
  });
});
