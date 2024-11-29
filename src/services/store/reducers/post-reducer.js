import { POST_ACTION_TYPES } from "../actions";

const initialPostState = { comments: [] };

export const postReducer = (state = initialPostState, { type, payload }) => {
  switch (type) {
    case POST_ACTION_TYPES.GET_POST:
      return { ...state, ...payload };
    case POST_ACTION_TYPES.ADD_COMMENT:
      return { ...state, comments: [payload, ...state.comments] };
    case POST_ACTION_TYPES.GET_COMMENTS:
      return { ...state, comments: [...payload] };
    case POST_ACTION_TYPES.DELETE_POST:
      return initialPostState;
    case POST_ACTION_TYPES.UPDATE_POST:
      return { ...state, content: payload };
    default:
      return state;
  }
};
