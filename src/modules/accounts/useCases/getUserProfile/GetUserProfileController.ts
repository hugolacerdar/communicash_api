import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserProfileUseCase } from "./GetUserProfileUseCase";

class GetUserProfileController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { user_id } = request;

      const getUserProfileUseCase = container.resolve(GetUserProfileUseCase);

      const user = await getUserProfileUseCase.execute(user_id);

      return response.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export { GetUserProfileController };
