export const selectUserRole = ({ user }) => user.role_id;
export const selectUserLogin = ({ user }) => user.login;
export const selectUser = ({ user }) => user;
export const selectUserSession = ({ user }) => user.session;

export const selectUsers = ({ users }) => users;

export const selectRoles = ({ roles }) => roles.roles;

export const selectPosts = ({ posts }, searchPhrase, isSearch) =>
  isSearch && searchPhrase?.length > 0 ? posts?.filter((post) => post.title.indexOf(searchPhrase) >= 0) : posts;

export const selectPost = ({ post }) => post;
export const selectComments = ({ post }) => post.comments;
