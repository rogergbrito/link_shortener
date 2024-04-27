import { Request, Response } from "express";
import dotenv from "dotenv";
import { create } from "./../repositories/links/create";
import { Url } from "../interfaces/Url";
import { generateShortenedUrl } from "../utils/generateShortenedUrl";
import { verifyToken } from "../utils/security";
import { includeHttps } from "../utils/includeHttps";
import { get } from "../repositories/users/get";
import { get as getLink, getLinks } from "../repositories/links/get";
import { getDataFromToken } from "../utils/getDataFromToken";
import {
  updateCount,
  updateDeletedAt,
  updateOriginalUrl,
} from "../repositories/links/update";

dotenv.config();

class LinkController {
  async shorten(req: Request, res: Response) {
    try {
      let { url }: Url = req.body;
      const Authorization = req.headers["authorization"] || ["Authorization"];

      if (!url) {
        return res.status(400).json({ message: "Please provide a url" });
      }

      url = includeHttps(url);

      if (Authorization && typeof Authorization === "string") {
        const token = Authorization.split(" ")[1];
        const tokenData = verifyToken(token);
        const { id, email } = tokenData as { id: string; email: string };

        const user = await get(email);
        if (user) {
          const shortenedUrl = generateShortenedUrl();
          await create(url, shortenedUrl, id);
          return res.status(201).json({
            shortenedUrl: `${process.env.DOMAIN_URL}/${shortenedUrl}`,
          });
        }
      } else {
        const shortenedUrl = generateShortenedUrl();
        await create(url, shortenedUrl, null);
        return res.status(201).json({
          shortenedUrl: `${process.env.DOMAIN_URL}/${shortenedUrl}`,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async redirect(req: Request, res: Response) {
    try {
      const { shortenedUrl } = req.params;

      if (!shortenedUrl) {
        return res
          .status(400)
          .json({ message: "Please provide a shortened url" });
      }

      const originalUrl = await getLink(shortenedUrl);
      if (!originalUrl) {
        return res.status(404).json({ message: "Url not found" });
      }

      const updatedClicks = originalUrl.accessCount + 1;
      await updateCount(originalUrl.id, updatedClicks);

      return res.redirect(originalUrl.originalUrl);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getLinks(req: Request, res: Response) {
    try {
      const { id, email } = getDataFromToken(req);

      const user = await get(email);
      if (user) {
        const links = await getLinks(id);
        return res.status(200).json(links);
      }

      return res.status(401).json({ message: "Unauthorized" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let { originalUrl } = req.body;

      const { email } = getDataFromToken(req);

      if (!id || !originalUrl) {
        return res.status(400).json({
          message: "Please provide an id and an original url",
        });
      }

      const user = await get(email);
      if (user) {
        originalUrl = includeHttps(originalUrl);

        try {
          await updateOriginalUrl(id, originalUrl, user.id);
          return res
            .status(200)
            .json({ message: "Link updated successfully", originalUrl });
        } catch (error) {
          console.error(error);
          return res
            .status(400)
            .json({ message: "The link does not belong to the user" });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { email } = getDataFromToken(req);

      if (!id) {
        return res.status(400).json({ message: "Please provide an id" });
      }

      const user = await get(email);
      if (user) {
        try {
          await updateDeletedAt(id, user.id);
          return res.status(200).json({ message: "Link deleted successfully" });
        } catch (error) {
          console.error(error);
          return res
            .status(400)
            .json({ message: "The link does not belong to the user" });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { LinkController };
