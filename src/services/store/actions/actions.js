import { USER_ACTION_TYPES, USERS_ACTION_TYPES } from "./constants";
import { server } from "../../../bff/server";
import { getUsersFromDb } from "../../../api";
import { getRolesFromDb } from "../../../api/role-requests";

export const setUser = (user) => ({
  type: USER_ACTION_TYPES.SET_USER,
  payload: user,
});

export const logoutUser = (session) => {
  server.logout(session);
  return {
    type: USER_ACTION_TYPES.LOGOUT,
  };
};

export const getUsers = () =>
  getUsersFromDb()
    .then((users) => ({ type: USERS_ACTION_TYPES.GET_USERS, payload: users }))
    .catch((error) => ({ error: error, errorMsg: "Ошибка сервера", payload: null }));
