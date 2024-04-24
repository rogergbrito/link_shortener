import { Request, Response } from "express";
import dotenv from "dotenv";
import { Register } from "../interfaces/Register";
import { generateHash } from "../utils/security";
import { create } from "./../repositories/users/create";

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
      res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { UserController };
