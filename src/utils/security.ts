import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function generateHash(password: string) {
  return await bcrypt.hash(password, 10);
}

async function verifyHash(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

function signToken(payload: object) {
  return jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: "1h" });
}

function verifyToken(token: string) {
  return jwt.verify(token, process.env.TOKEN_SECRET!);
}

export { generateHash, verifyHash, signToken, verifyToken };
