import { ROLES } from "../constants";
import { generateDate } from "../services";

export const getUsersFromDb = () => fetch("http://localhost:3005/users").then((res) => res.json());
export const getUser = (login) =>
  fetch(`http://localhost:3005/users?login=${login}`)
    .then((data) => data.json())
    .then((user) => user?.[0]);

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
      role_id: ROLES.READER,
    }),
  }).then((newUserData) => newUserData.json());
