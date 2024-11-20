import "./RecordSelectionMenu.scss";
import { Table } from "../../../../components/Table/Table";
import { selectRolesWithoutGhost } from "../../../../services/store/selectors/selectors";
import { useSelector } from "react-redux";

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
export const RecordSelectionMenu = ({ setSelectedRole, setIsMenuSelectOpen }) => {
  const roles = useSelector(selectRolesWithoutGhost);

  const handleCellClick = (role) => {
    setIsMenuSelectOpen(false);
    setSelectedRole(role);
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
                onCellClick: () => handleCellClick(role),
              }))
            }
          />
        )}
      </div>
    </div>
  );
};
