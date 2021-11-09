import { v4 as uuid4 } from "uuid";

import { AppError } from "../../../../shared/error/AppError";
import { InMemoryCommunitiesRepository } from "../../repositories/inMemory/CommunitiesRepository";
import { InMemoryUsersRepository } from "../../../accounts/repositories/inMemory/UsersRepository";

import { AddMemberUseCase } from "./AddMemberUseCase";

let addMemberUseCase: AddMemberUseCase;
let inMemoryCommunitiesRepository: InMemoryCommunitiesRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Add Member", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryCommunitiesRepository = new InMemoryCommunitiesRepository();
    addMemberUseCase = new AddMemberUseCase(
      inMemoryUsersRepository,
      inMemoryCommunitiesRepository
    );
  });

  it("should be able to add an user to a community", async () => {
    const user1Id = uuid4();
    const user2Id = uuid4();
    const user1Data = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
      id: user1Id,
    };
    const user2Data = {
      full_name: "Banana Test",
      email: "banana2@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
      id: user2Id,
    };

    const communityId = uuid4();
    const communityData = {
      name: "Banana Community",
      creator_id: user1Id,
      description: "Banana fam community",
      id: communityId,
    };

    await inMemoryUsersRepository.create(user1Data);
    await inMemoryUsersRepository.create(user2Data);

    await inMemoryCommunitiesRepository.create(communityData);

    await addMemberUseCase.execute({
      userToAddId: user2Id,
      communityMemberId: user1Id,
      communityId,
    });

    const user = await inMemoryUsersRepository.findById(user2Id);

    expect(user.community_id).toEqual(communityId);
  });

  it("should not be able to add an user to a community if the user is not found", async () => {
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

    await inMemoryCommunitiesRepository.create(communityData);

    expect(
      addMemberUseCase.execute({
        userToAddId: uuid4(),
        communityMemberId: userId,
        communityId,
      })
    ).rejects.toEqual(new AppError("User not found."));
  });

  it("should not be able to add an user to a community if the user is already part of a community", async () => {
    const user1Id = uuid4();
    const user2Id = uuid4();
    const user1Data = {
      full_name: "Banana Test",
      email: "banana@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
      id: user1Id,
    };
    const user2Data = {
      full_name: "Banana Test",
      email: "banana2@test.com",
      password: "12345",
      birth_date: new Date("1999-12-12 00:00:00"),
      id: user2Id,
    };

    const community1Id = uuid4();
    const community1Data = {
      name: "Banana Community",
      creator_id: user1Id,
      description: "Banana fam community",
      id: community1Id,
    };
    const community2Id = uuid4();
    const community2Data = {
      name: "Banana Community",
      creator_id: user2Id,
      description: "Banana fam community",
      id: community2Id,
    };

    await inMemoryUsersRepository.create({
      ...user1Data,
      community_id: community1Id,
    });
    await inMemoryUsersRepository.create({
      ...user2Data,
      community_id: community2Id,
    });

    await inMemoryCommunitiesRepository.create(community1Data);
    await inMemoryCommunitiesRepository.create(community2Data);

    expect(
      addMemberUseCase.execute({
        userToAddId: user2Id,
        communityMemberId: user1Id,
        communityId: community1Id,
      })
    ).rejects.toEqual(new AppError("User is already part of a community."));
  });
});
