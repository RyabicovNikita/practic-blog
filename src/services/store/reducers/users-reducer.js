import { USERS_ACTION_TYPES } from "../actions";

const initialUsersState = [];

export const usersReducer = (state = initialUsersState, { type, payload }) => {
  switch (type) {
    case USERS_ACTION_TYPES.GET_USERS:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
};
