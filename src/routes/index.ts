import { Router } from "express";
import { user } from "./user.routes";
import { link } from "./link.routes";

const router = Router();

router.use("/users", user);
router.use("/", link);

export default router;
