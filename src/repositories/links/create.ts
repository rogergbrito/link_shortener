import { database } from "../../database";

const create = async (
  originalUrl: string,
  shortenedUrl: string,
  userId: string | null,
) => {
  try {
    const link = await database.link.create({
      data: {
        originalUrl,
        shortenedUrl,
        userId,
      },
    });

    return link;
  } catch (error) {
    throw new Error(String(error));
  }
};

export { create };
