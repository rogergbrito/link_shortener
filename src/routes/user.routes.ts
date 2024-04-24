import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userController = new UserController();
const user = Router();

user.post("/register", userController.register);

export { user };
