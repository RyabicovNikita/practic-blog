import { ROLES } from "../../constants";
import { USERS_ACTION_TYPES } from "../actions";

const initialUsersState = [];

export const usersReducer = (state = initialUsersState, { type, payload }) => {
  switch (type) {
    case USERS_ACTION_TYPES.GET_USERS:
      return {
        ...state,
        users: payload?.map((user) => {
          const { role_id, ...userData } = user;
          return { ...userData, role: Object.keys(ROLES).find((key) => ROLES[key] === role_id) };
        }),
      };
    default:
      return state;
  }
};
