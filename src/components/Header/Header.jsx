import styled from "styled-components";
import { Button } from "../Button/Button";

export const Header = () => {
  const defaultStyle = {
    padding: "10px",
    "border-radius": "15px",
    display: "flex",
  };
  const Header = styled.header`
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    font-size: 35px;
    padding-left: 25px;
    padding-right: 25px;
    box-sizing: border-box;
    box-shadow: 20px 25px 30px 3px rgba(0, 0, 0, 0.5);
  `;
  const Navigate = styled.nav`
    ${defaultStyle}
    align-items: center;
    justify-content: center;
    gap: 30px;
    background-color: #474545c2;
  `;
  const Logo = styled.div`
    ${defaultStyle}
    font-size: 65px;
  `;
  const Profile = styled.div`
    ${defaultStyle}
    background-color: black;
    width: 100px;
    align-items: center;
    justify-content: center;
  `;
  return (
    <Header className="header">
      <Logo>DESIGN</Logo>
      <Navigate className="navigate">
        <Button active={true}>Main</Button>
        <Button>Contacts</Button>
      </Navigate>
      <Profile>Ghost</Profile>
    </Header>
  );
};
