import { useEffect, useState } from "react";
import "./RecordSelectionMenu.scss";
import { getRolesFromDb } from "../../../../api/role-requests";
import { Table } from "../../../../components/Table/Table";
export const RecordSelectionMenu = ({ onSelectRole }) => {
  const [roles, setRoles] = useState();
  useEffect(() => {
    getRolesFromDb().then((roles) => setRoles(roles));
  }, []);
  const tableStyleProps = {
    table: {
      padding: "20px",
    },
    row: {
      "grid-column-gap": "1px",
      "border-bottom": "1px solid black",
    },
    cell: {
      cursor: "pointer",
      height: "fit-content",
      padding: "15px",
    },
  };

  return (
    <div className="modal">
      <div className="modal__bg"></div>
      <div className="modal__content">
        {roles && (
          <Table
            styles={tableStyleProps}
            data={
              roles &&
              roles.map((role) => ({
                columns: [role.name],
                onCellClick: () => onSelectRole(role.id),
              }))
            }
          />
        )}
      </div>
    </div>
  );
};
