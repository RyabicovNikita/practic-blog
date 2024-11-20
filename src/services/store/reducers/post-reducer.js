import { POST_ACTION_TYPES } from "../actions";

const initialPostState = {};

export const postReducer = (state = initialPostState, { type, payload }) => {
  switch (type) {
    case POST_ACTION_TYPES.GET_POST:
      return payload;
    default:
      return state;
  }
};
