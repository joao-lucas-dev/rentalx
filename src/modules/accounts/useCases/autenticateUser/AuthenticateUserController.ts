import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AutenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const autenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await autenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };
