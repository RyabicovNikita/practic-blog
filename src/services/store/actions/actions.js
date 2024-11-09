import { ACTION_TYPES } from "./action-types";

export const setUser = (user) => ({
  type: ACTION_TYPES.SET_USER,
  payload: user,
});

export const logoutUser = (userID) => ({
  type: ACTION_TYPES.LOGOUT_USER,
  payload: userID,
});
