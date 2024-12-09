import { useEffect, useRef, useState } from "react";
import "./Users.scss";
import { useDispatch, useSelector } from "react-redux";
import { getRoles, getUsers, ROLES_ACTION_TYPES, USERS_ACTION_TYPES } from "../../services/store/actions";
import { Error } from "../../components";
import { Table } from "../../components/Table/Table";
import { RoleWithSaveIcon } from "./components/RoleWithSaveIcon/RoleWithSaveIcon";
import { selectUsers, selectUserSession } from "../../services/store/selectors/selectors";

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
  const [accessError, setAccessError] = useState(null);
  useEffect(() => {
    Promise.all([getRoles(userSession), getUsers(userSession)]).then((responsibles) => {
      const errResponse = responsibles.find((response) => response.res === null);
      if (errResponse) {
        setTimeout(() => setAccessError(errResponse.error), [500]);
        return;
      }
      setAccessError(null);
      setTimeout(() => {
        responsibles.forEach((res) => dispatch(res));
      }, [500]);
    });
    return () => {
      dispatch({ type: USERS_ACTION_TYPES.CLEAR_USERS });
      dispatch({ type: ROLES_ACTION_TYPES.CLEAR_ROLES });
    };
  }, []);

  return (
    <div className="users">
      <div className="users__scrollable">
        {accessError ? (
          <Error className="users__error">{accessError}</Error>
        ) : (
          <Table
            styles={tableStyleProps}
            data={
              users.length
                ? users.map((user) => ({
                    columns: [user.login, user.registed_at, <RoleWithSaveIcon user={user} />],
                  }))
                : []
            }
          />
        )}
      </div>
    </div>
  );
};
