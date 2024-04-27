import { database } from "../../database";

const get = async (email: string) => {
  try {
    const user = await database.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    throw new Error(String(error));
  }
};

export { get };
