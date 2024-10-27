export const getUsers = () => fetch("http://localhost:3005/users").then((res) => res.json());
export const getUser = async (login) => {
  const users = await getUsers();
  return users.find(({ l }) => l === login);
};
