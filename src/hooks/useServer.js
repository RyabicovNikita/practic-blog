import { useSelector } from "react-redux";
import { selectUserSession } from "../services/selectors/selectors";
import { server } from "../bff/server";

export const useServerRequest = () => {
  const session = useSelector(selectUserSession);

  return (operation, ...params) => {
    const request = ["register", "authorize"].includes(operation) ? params : [session, ...params];
    return server[operation](...request);
  };
};
