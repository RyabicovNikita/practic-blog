import { useSelector } from "react-redux";
import { Error } from "../Error/Error";
import { selectUserRole } from "../../services/store/selectors/selectors";
import { ERRORS } from "../../services";

export const PrivateContainer = ({ children, access, error = null }) => {
  const userRole = useSelector(selectUserRole);
  console.log(userRole);
  const accessError = access.includes(userRole) ? null : ERRORS.ACCESS_DENIED;
  return accessError || error ? <Error>{accessError || error}</Error> : children;
};
