import { useEffect, useState } from "react";
import "./RoleWithSaveIcon.scss";
import { RecordSelectionMenu } from "../RecordSelectionMenu/RecordSelectionMenu";
import { useSelector } from "react-redux";
import { selectRoles } from "../../../../services/selectors/selectors";
export const RoleWithSaveIcon = ({ user }) => {
  const [isMenuSelectOpen, setIsMenuSelectOpen] = useState(false);
  const roles = useSelector(selectRoles);
  const role = roles ? roles.find((role) => role.id === user.role_id) : null;
  const [selectedRole, setSelectedRole] = useState(role?.name);

  const onSelectClick = () => {
    setIsMenuSelectOpen(true);
  };

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setIsMenuSelectOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      {isMenuSelectOpen && (
        <RecordSelectionMenu setIsMenuSelectOpen={setIsMenuSelectOpen} setSelectedRole={setSelectedRole} user={user} />
      )}
      <div className="role-container">
        <div className="role-container__role">
          <span className="role-container__role-name">{selectedRole}</span>{" "}
          <img
            alt=""
            className="role-container__select"
            onClick={onSelectClick}
            src={require("../../../../icons/tree-dots.png")}
          />
        </div>
        <button
          className="role-container__save-icon"
          disabled={selectedRole === role?.name}
          onClick={() => console.log("Test")}
        >
          <i className="role-container__save fa fa-floppy-o" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
};
