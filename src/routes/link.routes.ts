import { Router } from "express";
import { LinkController } from "../controllers/link.controller";
import { checkToken } from "../middleware/checktoken";

const linkController = new LinkController();
const link = Router();

link.post("/shortener", linkController.shorten);
link.get("/:shortenedUrl", linkController.redirect);
link.get("/", checkToken, linkController.getLinks);
link.put("/:id", checkToken, linkController.update);
link.delete("/:id", checkToken, linkController.delete);

export { link };
