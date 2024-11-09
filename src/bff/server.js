import { addUser, getUser } from "../services";
import { sessions } from "./sessions";

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
      res: {
        id: user.id,
        login: user.login,
        roleId: user.role_id,
        session: sessions.create(user),
      },
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
      res: {
        id: user.id,
        login: user.login,
        roleId: user.role_id,
        session: sessions.create(user),
      },
    };
  },
};
