import { useSelector } from "react-redux";
import { Error } from "../Error/Error";
import { selectUserRole } from "../../services/store/selectors/selectors";
import { ERRORS } from "../../services";

export const PrivateContainer = ({ children, access = null, error = null }) => {
  const userRole = useSelector(selectUserRole);
  let accessError;
  if (access) accessError = access.includes(userRole) ? null : ERRORS.ACCESS_DENIED;
  return accessError || error ? <Error>{accessError || error}</Error> : children;
};
