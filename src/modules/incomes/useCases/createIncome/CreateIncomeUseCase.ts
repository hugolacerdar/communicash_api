import { IIncomesRepository } from "../../repositories/IIncomesRepositories";
import { inject, injectable } from "tsyringe";
import { ICreateIncomeDTO } from "../../dtos/ICreateIncomeDTO";

@injectable()
class CreateIncomeUseCase {
  constructor(
    @inject("IncomesRepository")
    private incomesRepository: IIncomesRepository
  ) {}

  async execute({ user_id, amount, description, date }: ICreateIncomeDTO) {
    await this.incomesRepository.create({ user_id, amount, description, date });
  }
}

export { CreateIncomeUseCase };
