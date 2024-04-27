import { database } from "../../database";

const updateCount = async (id: string, updatedClicks: number) => {
  try {
    const link = await database.link.update({
      where: {
        id,
      },
      data: {
        accessCount: updatedClicks,
      },
    });

    return link;
  } catch (error) {
    throw new Error(String(error));
  }
};

const updateOriginalUrl = async (
  id: string,
  originalUrl: string,
  userId: string,
) => {
  try {
    const link = await database.link.update({
      where: {
        id,
        userId,
      },
      data: {
        originalUrl,
        updatedAt: new Date(),
      },
    });

    return link;
  } catch (error) {
    throw new Error(String(error));
  }
};

const updateDeletedAt = async (id: string, userId: string) => {
  try {
    const link = await database.link.update({
      where: {
        id,
        userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return link;
  } catch (error) {
    throw new Error(String(error));
  }
};

export { updateCount, updateOriginalUrl, updateDeletedAt };
