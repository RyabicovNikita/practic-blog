import { useEffect, useState } from "react";
import "./RoleWithSaveIcon.scss";
import { RecordSelectionMenu } from "../RecordSelectionMenu/RecordSelectionMenu";
import { useDispatch, useSelector } from "react-redux";

import { deleteUser, postUserRole } from "../../../../api";
import { selectRoles, selectUser } from "../../../../services/store/selectors/selectors";
export const RoleWithSaveIcon = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [isMenuSelectOpen, setIsMenuSelectOpen] = useState(false);
  const roles = useSelector(selectRoles);
  const [selectedRole, setSelectedRole] = useState(roles?.find((role) => role.id === user.role_id));

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
          <span className="role-container__role-name">{selectedRole?.name}</span>{" "}
          {currentUser.login !== user.login && (
            <div>
              <img
                alt=""
                className="role-container__select"
                onClick={onSelectClick}
                src={require("../../../../icons/tree-dots.png")}
              />
            </div>
          )}
        </div>
        <button
          className="role-container__save-user"
          disabled={selectedRole?.id === user?.role_id}
          onClick={() => dispatch(postUserRole(user.id, selectedRole?.id))}
        >
          <i className="role-container__save fa fa-floppy-o" aria-hidden="true"></i>
        </button>
        <button
          className="role-container__delete-user"
          disabled={currentUser.login === user.login}
          onClick={() => dispatch(deleteUser(user.id))}
        >
          <i class="fa fa-trash role-container__delete" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
};
