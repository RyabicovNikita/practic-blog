import { ROLES } from "../services/constants";
import { generateDate } from "../services/services";

export const getUsersFromDb = () => fetch("http://localhost:3005/users").then((res) => res.json());
export const getUser = (login) =>
  fetch(`http://localhost:3005/users?login=${login}`)
    .then((data) => data.json())
    .then((user) => user?.[0]);

export const addUser = (login, password) =>
  fetch("http://localhost:3005/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      login,
      password,
      registed_at: generateDate(),
      role_id: ROLES.READER,
    }),
  }).then((newUserData) => newUserData.json());

export const postUserRole = (id, newRoleID) => (dispatch) => {
  fetch(`http://localhost:3005/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      role_id: newRoleID,
    }),
  })
    .then((res) => res.json())
    .then((newUser) =>
      dispatch({
        type: "UPDATE_USER_ROLE",
        payload: { login: newUser.login, role_id: newUser.role_id },
      })
    );
};

export const deleteUser = (id) => (dispatch) => {
  fetch(`http://localhost:3005/users/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      dispatch({ type: "DELETE_USER", payload: id });
    }
  });
};
