import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { full_name, email, password, birth_date } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      full_name,
      email,
      password,
      birth_date,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
