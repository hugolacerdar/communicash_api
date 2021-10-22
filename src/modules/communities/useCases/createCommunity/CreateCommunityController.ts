import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCommunityUseCase } from "./CreateCommunityUseCase";

class CreateCommunityController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, description } = request.body;
      const { user_id: creator_id } = request;

      const createCommunityUseCase = container.resolve(CreateCommunityUseCase);

      await createCommunityUseCase.execute({ name, creator_id, description });

      return response.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}

export { CreateCommunityController };
