import { useEffect, useState } from "react";
import "./Users.scss";
import { useDispatch, useSelector } from "react-redux";
import { getRoles, getUsers, ROLES_ACTION_TYPES, USERS_ACTION_TYPES } from "../../services/store/actions";
import { selectUsers, selectUserSession } from "../../services/selectors/selectors";
import { Error } from "../../components";
import { Table } from "../../components/Table/Table";
import { RoleWithSaveIcon } from "./components/RoleWithSaveIcon/RoleWithSaveIcon";

const tableStyleProps = {
  table: {
    padding: "20px",
  },
  row: {
    "grid-column-gap": "1px",
    "border-bottom": "1px solid white",
    "background-color": "white",
  },
  cell: {
    "background-color": "black",
    height: "fit-content",
    padding: "15px",
  },
};

export const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userSession = useSelector(selectUserSession);
  const [usersError, setUsersError] = useState(null);
  const [rolesError, setRolesError] = useState(null);
  useEffect(() => {
    getRoles(userSession).then((action) => {
      if (action.error) {
        setRolesError(action.error);
        console.error(action.error);
        return;
      } else {
        dispatch(action);
        setRolesError(null);
      }
    });
    getUsers(userSession).then((action) => {
      if (action.error) {
        setUsersError(action.error);
        console.error(action.error);
        return;
      } else {
        dispatch(action);
        setUsersError(null);
      }
    });
    return () => {
      dispatch({ type: USERS_ACTION_TYPES.CLEAR_USERS });
      dispatch({ type: ROLES_ACTION_TYPES.CLEAR_ROLES });
    };
  }, []);
  return (
    <div className="users">
      <div className="users__scrollable">
        {usersError || rolesError ? (
          <Error>{usersError || rolesError}</Error>
        ) : (
          <Table
            styles={tableStyleProps}
            data={
              users &&
              users.map((user) => ({
                columns: [user.login, user.registed_at, <RoleWithSaveIcon user={user} />],
              }))
            }
          />
        )}
      </div>
    </div>
  );
};
