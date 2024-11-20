import { POSTS_ACTION_TYPES } from "../services/store/actions/constants";

export const getPosts = () =>
  fetch("http://localhost:3005/posts")
    .then((res) => res.json())
    .then((posts) => ({ type: POSTS_ACTION_TYPES.GET_POSTS, payload: posts }));
