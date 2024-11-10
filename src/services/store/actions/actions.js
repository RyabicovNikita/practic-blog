import { ACTION_TYPES } from "./action-types";
import { server } from "../../../bff/server";

export const setUser = (user) => ({
  type: ACTION_TYPES.SET_USER,
  payload: user,
});

export const logoutUser = (session) => {
  server.logout(session);
  return {
    type: ACTION_TYPES.LOGOUT,
  };
};
