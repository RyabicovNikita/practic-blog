import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../../../../../components";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLogin } from "../../../../../../services/store/selectors/selectors";
import { logout } from "../../../../../../services/store/slice/authSlice";
import { SESSION_STORAGE_USER } from "../../../../../../services";

const NavBar = styled.div`
  display: flex;
  gap: 35px;
  align-items: center;
`;

const AuthLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  border-radius: 55px;
  display: flex;
  font-size: 45px;
  width: 150px;
  background-color: black;
  box-shadow: 1px -1px 15px 10px black;
  &:hover {
    color: gray;
    transition: 0.6s;
  }
`;

export const NavBarContainer = ({ isMenuOpen, setIsMenuOpen, setContextMenuAnimation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(selectUserLogin);
  const onMenuClick = () => {
    const animationOptions = {
      animation: isMenuOpen ? "close-menu 1s" : "open-menu 1s",
      "animation-fill-mode": "forwards",
    };
    if (isMenuOpen) {
      setTimeout(() => setIsMenuOpen(false), 1000);
    } else {
      setIsMenuOpen(true);
      setTimeout(() => {
        setContextMenuAnimation({ ...animationOptions, animation: "close-menu 1s" });
        setTimeout(() => setIsMenuOpen(false), 1000);
      }, 15000);
    }
    setContextMenuAnimation(animationOptions);
  };
  const handleLogout = () => {
    if (!userLogin) return;
    dispatch(logout());
    const currentUserDataJSON = sessionStorage.getItem(SESSION_STORAGE_USER);
    if (!currentUserDataJSON) return;
    sessionStorage.removeItem(SESSION_STORAGE_USER);
  };
  return (
    <NavBar>
      <Icon
        className="fa fa-reply"
        styles={"&:hover {color: gray;transition: 0.6s;cursor: pointer;}"}
        onClick={() => navigate(-1)}
      />
      <AuthLink to={userLogin ? "/" : "/auth"} onClick={handleLogout}>
        {userLogin ? "Logout" : "Login"}
      </AuthLink>
      <Icon className="fa fa-bars" onClick={onMenuClick} />
    </NavBar>
  );
};
