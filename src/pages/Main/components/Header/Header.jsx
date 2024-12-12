import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DropDownMenu } from "../../../../components/DropDownMenu/DropDownMenu";
import { headerBack_img, logoBack_img } from "../../../../images";
import { Navigation } from "./components";
import { NavBarContainer } from "./components/NavBar/NavBar";
import "./Header.scss";

const Header = styled.div`
  display: flex;
  gap: 15px;
  height: 100%;
  max-height: 120px;
  background-image: url(${({ href }) => href});
  background-size: cover;
  background-origin: border-box;
  background-position: bottom;
  background-repeat: no-repeat;
  position: relative;
  z-index: 2;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  font-size: 35px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  box-shadow: 0px 20px 25px 2px rgba(0, 0, 0, 1);
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  font-size: 65px;
  width: 270px;
  background-image: url(${({ href }) => href});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const HeaderContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contextMenuAnimation, setContextMenuAnimation] = useState({});

  return (
    <>
      <Header href={headerBack_img}>
        <LogoLink href={logoBack_img} to="/">
          Blog
        </LogoLink>
        <Navigation />
        <NavBarContainer
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setContextMenuAnimation={setContextMenuAnimation}
        />
      </Header>
      {isMenuOpen && <DropDownMenu setIsMenuOpen={setIsMenuOpen} animation={contextMenuAnimation} />}
    </>
  );
};
