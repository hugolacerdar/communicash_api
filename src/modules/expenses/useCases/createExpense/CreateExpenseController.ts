import { IExpensesRepository } from "../../repositories/IExpensesRepository";
import { container, inject, injectable } from "tsyringe";
import { ICreateExpenseDTO } from "../../dtos/ICreateExpenseDTO";
import { NextFunction, Request, Response } from "express";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";

class CreateExpenseController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { user_id, community_id } = request;
      const { amount, description, date, category_id } = request.body;

      const createExpenseUseCase = container.resolve(CreateExpenseUseCase);

      await createExpenseUseCase.execute({
        user_id,
        community_id,
        category_id,
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

export { CreateExpenseController };
