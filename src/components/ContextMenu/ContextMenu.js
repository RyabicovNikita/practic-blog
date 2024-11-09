import { Link } from "react-router-dom";
import "./ContextMenu.scss";
export const ContextMenu = ({ setIsMenuOpen }) => {
  const onItemClick = () => setIsMenuOpen(false);
  return (
    <div className="menu">
      <div className="menu__user">
        <span className="menu__userName">Колян</span>
        <div className="menu__userIcon"></div>
      </div>
      <ul className="menu__list-items">
        <li className="menu__list-item">
          <Link onClick={onItemClick} to="/users">
            Users
          </Link>
        </li>
        <li className="menu__list-item">
          <Link onClick={onItemClick} to={`blog/:id`}>
            New blog
          </Link>
        </li>
      </ul>
    </div>
  );
};
