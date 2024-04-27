import { Request } from "express";
import { verifyToken } from "./security";

function getDataFromToken(req: Request) {
  const Authorization = req.headers["authorization"] || ["Authorization"];

  const token = (
    Array.isArray(Authorization) ? Authorization[0] : Authorization
  ).split(" ")[1];

  const tokenData = verifyToken(token);
  const { id, email } = tokenData as { id: string; email: string };
  return { id, email };
}

export { getDataFromToken };
