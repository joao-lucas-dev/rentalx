import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, "9223ccedb8f47db7be8d5402bbb043f1");
    const { sub: user_id } = decoded as ITokenPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User does not found");
    }

    return next();
  } catch {
    throw new Error("Invalid JWT token");
  }
};

export default ensureAuthenticated;
