import { Link } from "react-router-dom";
import "./ContextMenu.scss";
import { useSelector } from "react-redux";
import { selectUserLogin } from "../../services/selectors/selectors";
export const ContextMenu = ({ setIsMenuOpen, animation }) => {
  const userLogin = useSelector(selectUserLogin);
  const onItemClick = () => {
    setIsMenuOpen(false);
  };
  return (
    <div className="menu" style={animation}>
      <div className="menu__user">
        <span className="menu__userName">{userLogin ?? "Ghost"}</span>
        <div className="menu__userIcon"></div>
      </div>
      <ul className="menu__list-items">
        <li className="menu__list-item">
          <Link onClick={onItemClick} to="/users">
            Users
          </Link>
        </li>
        <li className="menu__list-item">
          <Link onClick={onItemClick} to={`/newBlog`}>
            New blog
          </Link>
        </li>
      </ul>
    </div>
  );
};
