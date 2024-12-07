import { POST_ACTION_TYPES, ROLES_ACTION_TYPES, USER_ACTION_TYPES, USERS_ACTION_TYPES } from "./constants";
import { server } from "../../../bff/server";
import {
  fetchAddCommentInPost,
  fetchCommentsPost,
  fetchDeletePost,
  fetchDeleteComment,
  getPostById,
  getUsersFromDb,
  fetchCreatePost,
} from "../../../api";
import { getRolesFromDb } from "../../../api/roles-requests";
import { sessions } from "../../../bff/sessions";
import { DATE_FORMATS, ROLES } from "../../constants";
import { DateTime } from "luxon";

export const setUser = (user) => ({
  type: USER_ACTION_TYPES.SET_USER,
  payload: user,
});

export const logoutUser = (session) => {
  server.logout(session);
  // dispatch(logout());
};

export const getUsers = async (userSession) => {
  const accessRoles = [ROLES.ADMIN];
  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: "Доступ к данным пользователей недоступен для текущей роли",
      res: null,
    };
  }

  return getUsersFromDb()
    .then((users) => ({ type: USERS_ACTION_TYPES.GET_USERS, payload: users }))
    .catch((error) => ({ error: error, errorMsg: "Ошибка сервера", payload: null }));
};

export const getRoles = async (userSession) => {
  const accessRoles = [ROLES.ADMIN];
  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: "Доступ к данным ролей недоступен для текущей роли пользователя",
      res: null,
    };
  }
  return getRolesFromDb()
    .then((roles) => ({ type: ROLES_ACTION_TYPES.GET_ROLES, payload: roles }))
    .catch((error) => ({ error: error, errorMsg: "Ошибка сервера", payload: null }));
};

export const addNewComment = (user, postId, content) => (dispatch) => {
  return fetchAddCommentInPost(user.id, postId, content).then((newComment) => {
    dispatch({
      type: POST_ACTION_TYPES.ADD_COMMENT,
      payload: { ...newComment, author_login: user.login },
    });
  });
};

export const getCommentsPost = (postId) =>
  fetchCommentsPost(postId).then((comments) =>
    getUsersFromDb().then((users) =>
      comments.map((comment) => ({
        ...comment,
        author_login: users.find((user) => user.id === comment.author_id)?.login,
      }))
    )
  );

export const getPost = async (postId) => {
  try {
    const post = await getPostById(postId);

    const commentsPost = await getCommentsPost(postId);

    console.log("PostInfo");
    console.log(post);

    const sortByDateComments = commentsPost.sort((a, b) => {
      if (
        DateTime.fromFormat(a.published_at, DATE_FORMATS.DATETIME) >
        DateTime.fromFormat(b.published_at, DATE_FORMATS.DATETIME)
      )
        return -1;

      if (
        DateTime.fromFormat(a.published_at, DATE_FORMATS.DATETIME) <
        DateTime.fromFormat(b.published_at, DATE_FORMATS.DATETIME)
      )
        return 1;

      return 0;
    });

    return { ...post, comments: sortByDateComments };
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (postId) => {
  try {
    const comments = await fetchCommentsPost(postId);
    comments.forEach(async ({ id }) => {
      await fetchDeleteComment(id);
    });
    await fetchDeletePost(postId);
    return { type: POST_ACTION_TYPES.DELETE_POST };
  } catch (error) {
    console.error(error);
  }
};

export const createNewPost = (data) => (dispatch) =>
  fetchCreatePost(data).then((newPostData) => dispatch({ type: POST_ACTION_TYPES.CREATE_POST, payload: newPostData }));

export const deleteComment = (commentId) => (dispatch) =>
  fetchDeleteComment(commentId).then(() => dispatch({ type: POST_ACTION_TYPES.DELETE_COMMENT, payload: commentId }));
