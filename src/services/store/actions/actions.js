import { POST_ACTION_TYPES, ROLES_ACTION_TYPES, USER_ACTION_TYPES, USERS_ACTION_TYPES } from "./constants";
import { server } from "../../../bff/server";
import { fetchAddCommentInPost, fetchCommentsPost, getPostById, getUsersFromDb } from "../../../api";
import { getRolesFromDb } from "../../../api/roles-requests";
import { sessions } from "../../../bff/sessions";
import { ROLES } from "../../constants";

export const setUser = (user) => ({
  type: USER_ACTION_TYPES.SET_USER,
  payload: user,
});

export const logoutUser = (session) => {
  server.logout(session);
  return {
    type: USER_ACTION_TYPES.LOGOUT,
  };
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
  return fetchAddCommentInPost(user.id, postId, content).then((newComment) =>
    dispatch({
      type: POST_ACTION_TYPES.ADD_COMMENT,
      payload: { ...newComment, author_login: user.login },
    })
  );
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
  const post = await getPostById(postId);

  const commentsPost = await getCommentsPost(postId);

  return { ...post, comments: commentsPost };
};
