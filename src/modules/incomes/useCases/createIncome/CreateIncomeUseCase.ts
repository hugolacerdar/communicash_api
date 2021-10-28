import { IIncomesRepository } from "../../repositories/IIncomesRepository";
import { inject, injectable } from "tsyringe";
import { ICreateIncomeDTO } from "../../dtos/ICreateIncomeDTO";

@injectable()
class CreateIncomeUseCase {
  constructor(
    @inject("IncomesRepository")
    private incomesRepository: IIncomesRepository
  ) {}

  async execute({
    user_id,
    amount,
    description,
    date,
    community_id,
  }: ICreateIncomeDTO) {
    await this.incomesRepository.create({
      user_id,
      amount,
      description,
      date,
      community_id,
    });
  }
}

export { CreateIncomeUseCase };
