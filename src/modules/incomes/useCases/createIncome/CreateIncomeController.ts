import { IIncomesRepository } from "../../repositories/IIncomesRepository";
import { container, inject, injectable } from "tsyringe";
import { ICreateIncomeDTO } from "../../dtos/ICreateIncomeDTO";
import { NextFunction, Request, Response } from "express";
import { CreateIncomeUseCase } from "./CreateIncomeUseCase";

class CreateIncomeController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { user_id, community_id } = request;
      const { amount, description, date } = request.body;

      const createIncomeUseCase = container.resolve(CreateIncomeUseCase);

      await createIncomeUseCase.execute({
        user_id,
        community_id,
        amount,
        description,
        date,
      });

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { CreateIncomeController };
