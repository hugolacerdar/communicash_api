import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { user_id } = request;
      const deleteUserUseCase = container.resolve(DeleteUserUseCase);

      await deleteUserUseCase.execute(user_id);

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { DeleteUserController };
