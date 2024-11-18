import { ROLES_ACTION_TYPES } from "../actions";

const initialRolesState = [];

export const rolesReducer = (state = initialRolesState, { type, payload }) => {
  switch (type) {
    case ROLES_ACTION_TYPES.GET_ROLES:
      return {
        ...state,
        roles: payload.map((role) => ({ ...role, id: Number(role.id) })),
      };
    default:
      return state;
  }
};
