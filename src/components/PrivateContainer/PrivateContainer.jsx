import { Error } from "../Error/Error";

export const PrivateContainer = ({ children, error = null }) => {
  return error ? <Error>{error}</Error> : children;
};
