import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const authResponse = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.status(201).json(authResponse);
    } catch (error) {
      next(error);
    }
  }
}

export { AuthenticateUserController };
