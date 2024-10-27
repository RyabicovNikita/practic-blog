import { addUser } from "../services/db-actions";

import { getUser } from "./get";
import { createSession } from "./session";

export const server = {
  async authorize(inputLogin, inputPassword) {
    const user = await getUser(inputLogin);
    if (!user)
      return {
        error: "Пользователь не найден",
        res: null,
      };
    if (inputPassword !== user.password)
      return {
        error: "Неверный пароль",
        res: null,
      };

    return {
      error: null,
      res: createSession(user.role_id),
    };
  },
  async register(inputLogin, inputPassword) {
    const user = await getUser(inputLogin);
    if (user)
      return {
        error: "Такой логин уже занят",
        res: null,
      };
    await addUser(inputLogin, inputPassword);

    return {
      error: null,
      res: createSession(user.role_id),
    };
  },
};
