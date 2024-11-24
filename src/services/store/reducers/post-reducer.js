import { POST_ACTION_TYPES } from "../actions";

const initialPostState = { comments: [] };

export const postReducer = (state = initialPostState, { type, payload }) => {
  switch (type) {
    case POST_ACTION_TYPES.GET_POST:
      return { ...state, ...payload };
    case POST_ACTION_TYPES.ADD_COMMENT:
      state.comments.unshift({ ...payload });
      return { ...state };
    case POST_ACTION_TYPES.GET_COMMENTS:
      return { ...state, comments: [...payload] };
    default:
      return state;
  }
};
