import { v4 as uuid4 } from "uuid";

import { CreateExpenseUseCase } from "./CreateExpenseUseCase";

import { AppError } from "../../../../shared/error/AppError";
import { InMemoryExpensesRepository } from "../../repositories/inMemory/ExpensesRepository";
import { InMemoryExpensesCategoriesRepository } from "../../repositories/inMemory/ExpensesCategoriesRepository";

let createExpenseUseCase: CreateExpenseUseCase;
let inMemoryExpensesRepository: InMemoryExpensesRepository;
let inMemoryExpensesCategoriesRepository: InMemoryExpensesCategoriesRepository;

describe("Create Expense", () => {
  beforeEach(() => {
    inMemoryExpensesRepository = new InMemoryExpensesRepository();
    inMemoryExpensesCategoriesRepository =
      new InMemoryExpensesCategoriesRepository();
    createExpenseUseCase = new CreateExpenseUseCase(
      inMemoryExpensesRepository,
      inMemoryExpensesCategoriesRepository
    );
  });

  it("should be able create an expense", async () => {
    const userId = uuid4();

    const communityId = uuid4();

    const [housing] = inMemoryExpensesCategoriesRepository.categories;

    await createExpenseUseCase.execute({
      user_id: userId,
      amount: 1000,
      description: "Rent",
      date: new Date(Date.now()),
      community_id: communityId,
      category_id: housing.id,
    });

    const [expense] = await inMemoryExpensesRepository.getByUserId(userId);

    expect(expense).toHaveProperty("id");
  });

  it("should not be able create an expense if the category is not found", async () => {
    const userId = uuid4();

    const communityId = uuid4();

    expect(
      createExpenseUseCase.execute({
        user_id: userId,
        amount: 1000,
        description: "Rent",
        date: new Date(Date.now()),
        community_id: communityId,
        category_id: uuid4(),
      })
    ).rejects.toEqual(new AppError("Category not found"));
  });
});
