import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../../../config/auth";

interface IPayload {
  sub: string;
}

export function checkAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error("Missing token");

  const [_, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.tokenSecret) as IPayload;

    request.user_id = user_id;

    next();
  } catch (error) {
    throw new Error("Invalid token");
  }
}
