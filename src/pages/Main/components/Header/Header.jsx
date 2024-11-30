import styled from "styled-components";

import "./Header.scss";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ContextMenu } from "../../../../components/ContextMenu/ContextMenu";
import { selectUserLogin } from "../../../../services/store/selectors/selectors";
import { logout } from "../../../../services/store/slice/authSlice";

const defaultStyle = {
  padding: "10px",
  "border-radius": "15px",
  display: "flex",
};

const Navigate = styled.nav`
  ${defaultStyle}
  align-items: center;
  justify-content: center;
  gap: 30px;
  background-color: #474545c2;
`;

const Settings = styled.div`
  display: flex;
  gap: 35px;
  align-items: center;
`;

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector(selectUserLogin);

  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contextMenuAnimation, setContextMenuAnimation] = useState({});

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

  const onReplyIconClick = () => {
    navigate(-1);
  };

  const onLogoutClick = () => {
    dispatch(logout());
    navigate(-1);
  };

  return (
    <>
      <div className="header">
        <Link to="/" className="header__logo">
          Blog
        </Link>
        <Navigate>
          <Link to="/" className={"header__menuItem " + (location.pathname === "/" ? "active" : "")}>
            Main
          </Link>
          <Link to="/post" className={"header__menuItem " + (location.pathname === "/post" ? "active" : "")}>
            New Blog
          </Link>
        </Navigate>
        <Settings>
          <div className="logo icon">
            <i className="fa fa-reply backIcon" aria-hidden="true" onClick={onReplyIconClick}></i>
          </div>
          {userLogin ? (
            <a onClick={onLogoutClick} className="header__auth-button">
              Logout
            </a>
          ) : (
            <Link to="/auth" className="header__auth-button">
              Login
            </Link>
          )}
          <i onClick={onMenuClick} className="fa fa-bars more" aria-hidden="true"></i>
        </Settings>
      </div>
      {isMenuOpen && <ContextMenu setIsMenuOpen={setIsMenuOpen} animation={contextMenuAnimation} />}
    </>
  );
};
