import { useEffect, useState } from "react";
import "./Users.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../services/store/actions";
import { UserCard } from "./components/UserCard/UserCard";
import { selectUsers } from "../../services/selectors/selectors";
import { Error } from "../../components";
import { Table } from "../../components/Table/Table";
import { TableContext } from "../../services/context/context";

export const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [error, setError] = useState(null);
  useEffect(() => {
    getUsers().then((action) => {
      if (action.error) {
        setError(action.errorMsg);
        console.error(action.error);
        return;
      } else {
        dispatch(action);
        setError(null);
      }
    });
  }, []);

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
  return (
    <div className="users">
      <div className="users__scrollable">
        {error ? (
          <Error className={"users__error"}>{error}</Error>
        ) : (
          <div className="users__table">
            {/* <div className="users__row">
              <div className="users__cell">Login</div>
              <div className="users__cell">Create date</div>
              <div className="users__cell">Role</div>
            </div> */}
            <Table
              styles={tableStyleProps}
              data={users && users.map((user) => ({ columns: [user.login, user.registed_at, user.role] }))}
            />

            {/* {users && users?.map((user) => <UserCard user={user} />)} */}
          </div>
        )}
      </div>
    </div>
  );
};
