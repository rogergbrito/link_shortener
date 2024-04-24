import { database } from "../../database";
import { Register } from "../../interfaces/Register";

const create = async (data: Register) => {
  try {
    const user = await database.user.create({
      data,
    });

    return user;
  } catch (error) {
    throw new Error(String(error));
  }
};

export { create };
