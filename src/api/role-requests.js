export const getRolesFromDb = () => fetch("http://localhost:3005/roles").then((res) => res.json());
