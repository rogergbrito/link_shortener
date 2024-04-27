import { Request, Response } from "express";
import dotenv from "dotenv";
import { Register } from "../interfaces/Register";
import { Login } from "../interfaces/Login";
import { generateHash, verifyHash, signToken } from "../utils/security";
import { create } from "./../repositories/users/create";
import { get } from "./../repositories/users/get";

dotenv.config();

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password }: Register = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
      }

      const hashedPassword = await generateHash(password);

      const user = await create({ name, email, password: hashedPassword });
      return res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password }: Login = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
      }

      const user = await get(email);
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      const isMatch = await verifyHash(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = signToken({ id: user.id, email: user.email });
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { UserController };
