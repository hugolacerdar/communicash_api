import { v4 as uuid4 } from "uuid";

import { CreateIncomeUseCase } from "./CreateIncomeUseCase";

import { AppError } from "../../../../shared/error/AppError";
import { InMemoryIncomesRepository } from "../../repositories/inMemory/IncomesRepository";

let createIncomeUseCase: CreateIncomeUseCase;
let inMemoryIncomesRepository: InMemoryIncomesRepository;

describe("Create Income", () => {
  beforeEach(() => {
    inMemoryIncomesRepository = new InMemoryIncomesRepository();
    createIncomeUseCase = new CreateIncomeUseCase(inMemoryIncomesRepository);
  });

  it("should be able create an income", async () => {
    const userId = uuid4();

    const communityId = uuid4();

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
});
