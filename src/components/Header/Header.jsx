import styled from "styled-components";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

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

  const Profile = styled.div`
    ${defaultStyle}
    background-color: black;
    width: 100px;
    align-items: center;
    justify-content: center;
  `;
  return (
    <Header className="header">
      <Link className="logo">Blog</Link>
      <Navigate className="navigate">
        <Button active={true}>Main</Button>
        <Button>Contacts</Button>
      </Navigate>
      <Profile className="user">Ghost</Profile>
    </Header>
  );
};
