import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../../../../../components";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLogin } from "../../../../../../services/store/selectors/selectors";
import { logout } from "../../../../../../services/store/slice/authSlice";
import { debounce, SESSION_STORAGE_USER } from "../../../../../../services";
import { useContext, useMemo, useState } from "react";
import { SearchContext } from "../../../../../../services/context/context";

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

const SearchContainer = ({ value, onChange }) => (
  <div>
    <input value={value} onChange={onChange} placeholder="Search..."></input>
  </div>
);

export const NavBarContainer = ({ isMenuOpen, setIsMenuOpen, setContextMenuAnimation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(selectUserLogin);
  const { searchPhrase, setSearchPhrase, isSearch, setIsSearch } = useContext(SearchContext);

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

  const startDelayedSearch = useMemo(() => debounce(setIsSearch, 2000), []);

  const handleSearch = ({ target }) => {
    setSearchPhrase(target.value);

    startDelayedSearch(!isSearch);
  };
  return (
    <NavBar>
      <SearchContainer value={searchPhrase} onChange={handleSearch} />
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
