import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AddMemberUseCase } from "./AddMemberUseCase";

class AddMemberController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { user_id: communityMemberId, community_id: communityId } = request;
      const { user_to_add_id: userToAddId } = request.body;

      const addMemberUseCase = container.resolve(AddMemberUseCase);

      await addMemberUseCase.execute({
        communityId,
        userToAddId,
        communityMemberId,
      });

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { AddMemberController };
