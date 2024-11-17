import { useEffect, useState } from "react";
import "./Users.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../services/store/actions";
import { selectUsers } from "../../services/selectors/selectors";
import { Error } from "../../components";
import { Table } from "../../components/Table/Table";
import { RoleWithSaveIcon } from "./components/RoleWithSaveIcon/RoleWithSaveIcon";
import { RecordSelectionMenu } from "./components/RecordSelectionMenu/RecordSelectionMenu";

export const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [error, setError] = useState(null);
  const [roleIsSelected, setRoleIsSelected] = useState(false);
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

  const handleSelectRole = (roleID) => {
    console.log(roleID);
    setRoleIsSelected(false);
  };

  return (
    <div className="users">
      {roleIsSelected && <RecordSelectionMenu onSelectRole={handleSelectRole} />}
      <div className="users__scrollable">
        {error ? (
          <Error className={"users__error"}>{error}</Error>
        ) : (
          <Table
            styles={tableStyleProps}
            data={
              users &&
              users.map((user) => ({
                columns: [
                  user.login,
                  user.registed_at,
                  <RoleWithSaveIcon
                    setRoleIsSelected={setRoleIsSelected}
                    role={{ id: user.role_id, name: user.role }}
                  />,
                ],
              }))
            }
          />
        )}
      </div>
    </div>
  );
};
