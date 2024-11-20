import { USERS_ACTION_TYPES } from "../actions";

const initialUsersState = [];

export const usersReducer = (state = initialUsersState, { type, payload }) => {
  switch (type) {
    case USERS_ACTION_TYPES.GET_USERS:
      return [...payload];
    case USERS_ACTION_TYPES.CLEAR_USERS:
      return initialUsersState;
    case USERS_ACTION_TYPES.UPDATE_USER_ROLE: {
      const user = state.find((user) => user.login === payload.login);
      user.role_id = payload.role_id;
      return [...state];
    }
    case USERS_ACTION_TYPES.DELETE_USER:
      return [...state.filter((user) => user.id !== payload)];
    default:
      return state;
  }
};
