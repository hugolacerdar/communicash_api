import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { EditUserUseCase } from "./EditUserUseCase";

class EditUserController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { full_name } = request.body;
      const { user_id } = request;

      const editUserUseCase = container.resolve(EditUserUseCase);

      await editUserUseCase.execute({
        full_name,
        id: user_id,
      });

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { EditUserController };
