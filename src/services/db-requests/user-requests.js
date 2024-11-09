import { generateDate } from "../services";

export const getUsers = () => fetch("http://localhost:3005/users").then((res) => res.json());
export const getUser = async (login) => {
  const users = await getUsers();
  return users.find(({ l }) => l === login);
};

export const addUser = (login, password) =>
  fetch("http://localhost:3005/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      login,
      password,
      registed_at: generateDate(),
      role_id: 2,
    }),
  });
