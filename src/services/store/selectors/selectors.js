import { ROLES } from "../../constants";

export const selectUserRole = ({ user }) => user.role_id;
export const selectUserLogin = ({ user }) => user.login;
export const selectUser = ({ user }) => user;
export const selectUserSession = ({ user }) => user.session;

export const selectUsers = ({ users }) => users;

export const selectRoles = ({ roles }) => roles.roles;

export const selectRolesWithoutGhost = ({ roles }) => roles.roles.filter((role) => role.id !== ROLES.GHOST);

export const selectPosts = ({ posts }) => posts;

export const selectPost = ({ post }) => post;