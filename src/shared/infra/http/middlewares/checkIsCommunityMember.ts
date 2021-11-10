import { NextFunction, Request, Response } from "express";

import { AppError } from "../../../../shared/error/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

export async function checkIsCommunityMember(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { user_id } = request;
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found.");
    }

    if (!user.community_id) {
      throw new AppError("No community association found.");
    }

    request.community_id = user.community_id;

    next();
  } catch (error) {
    next(error);
  }
}
