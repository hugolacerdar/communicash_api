import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { GetCategoriesUseCase } from "./GetCategoriesUseCase";

class GetCategoriesController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const getCategoriesUseCase = container.resolve(GetCategoriesUseCase);

    const categories = await getCategoriesUseCase.execute();

    return response.send({ categories });
  }
}

export { GetCategoriesController };
