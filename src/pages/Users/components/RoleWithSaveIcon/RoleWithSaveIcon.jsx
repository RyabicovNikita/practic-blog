import "./RoleWithSaveIcon.scss";
export const RoleWithSaveIcon = ({ role, setRoleIsSelected }) => {
  const onSelectClick = () => {
    setRoleIsSelected(true);
  };
  return (
    <div className="role-container">
      <div className="role-container__role">
        <span className="role-container__role-name">{role.name}</span>{" "}
        <img
          alt=""
          className="role-container__select"
          onClick={onSelectClick}
          src={require("../../../../icons/tree-dots.png")}
        />
      </div>
      <i className="role-container__save fa fa-floppy-o" aria-hidden="true"></i>
    </div>
  );
};
