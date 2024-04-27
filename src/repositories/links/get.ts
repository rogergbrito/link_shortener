import { database } from "../../database";

const get = async (shortenedUrl: string) => {
  try {
    const originalUrl = await database.link.findFirst({
      where: {
        shortenedUrl,
      },
    });

    return originalUrl;
  } catch (error) {
    throw new Error(String(error));
  }
};

const getLinks = async (userId: string) => {
  try {
    const links = await database.link.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      select: {
        id: true,
        originalUrl: true,
        shortenedUrl: true,
        accessCount: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return links;
  } catch (error) {
    throw new Error(String(error));
  }
};

export { get, getLinks };
