import { POSTS_ACTION_TYPES } from "../actions/constants";

const initialPostsState = [];

export const postsReducer = (state = initialPostsState, { type, payload }) => {
  switch (type) {
    case POSTS_ACTION_TYPES.GET_POSTS:
      return [...state, ...payload];
    case POSTS_ACTION_TYPES.CLEAR_POSTS:
      return initialPostsState;
    case POSTS_ACTION_TYPES.FILTER_POSTS:
      return payload;
    default:
      return state;
  }
};
