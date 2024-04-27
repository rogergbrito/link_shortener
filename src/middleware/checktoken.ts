import { NextFunction, Response, Request } from "express";
import { verifyToken } from "../utils/security";
import dotenv from "dotenv";

dotenv.config();

export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: "Token not sent" });
  }

  const [type, token] = (authorization as string).split(" ");

  if (type !== "Bearer") {
    return res.status(401).json({ message: "Unsuported authorization type" });
  }

  try {
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Expired or invalid token" });
  }
}
