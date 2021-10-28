import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { GetIncomesAndExpensesUseCase } from "./GetIncomesAndExpensesUseCase";

class GetIncomesAndExpensesController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { community_id } = request;

      const getAllIncomesAndExpenses = container.resolve(
        GetIncomesAndExpensesUseCase
      );

      const community = await getAllIncomesAndExpenses.execute(community_id);

      return response.status(200).json(community);
    } catch (error) {
      next(error);
    }
  }
}

export { GetIncomesAndExpensesController };
