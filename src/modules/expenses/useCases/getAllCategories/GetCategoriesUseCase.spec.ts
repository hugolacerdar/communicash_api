import { InMemoryExpensesCategoriesRepository } from "../../repositories/inMemory/ExpensesCategoriesRepository";
import { GetCategoriesUseCase } from "./GetCategoriesUseCase";

let getCategoriesUseCase: GetCategoriesUseCase;
let inMemoryExpensesCategoriesRepository: InMemoryExpensesCategoriesRepository;

describe("Get Categories", () => {
  beforeAll(() => {
    inMemoryExpensesCategoriesRepository =
      new InMemoryExpensesCategoriesRepository();
    getCategoriesUseCase = new GetCategoriesUseCase(
      inMemoryExpensesCategoriesRepository
    );
  });

  it("should be able to get all 10 expenses categories", async () => {
    const categories = await getCategoriesUseCase.execute();

    expect(categories).toHaveLength(10);
  });
});
