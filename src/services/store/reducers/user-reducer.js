import { ROLES } from "../../constants";
import { USER_ACTION_TYPES } from "../actions/constants";

const initialUserState = {
  id: null,
  login: null,
  role_id: ROLES.GHOST,
  session: null,
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case USER_ACTION_TYPES.LOGOUT: {
      return initialUserState;
    }
    case USER_ACTION_TYPES.UPDATE_USER_ROLE: {
      return {
        ...state,
        role_id: action.payload,
      };
    }
    default:
      return state;
  }
};
