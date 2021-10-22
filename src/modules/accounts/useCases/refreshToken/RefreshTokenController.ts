import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const token =
        request.body.token ||
        request.headers["x-access-token"] ||
        request.query.token;

      const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

      const refreshTokenResponse = await refreshTokenUseCase.execute(token);

      return response.json(refreshTokenResponse);
    } catch (error) {
      next(error);
    }
  }
}

export { RefreshTokenController };
