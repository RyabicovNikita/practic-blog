import styled from "styled-components";
import { Button } from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

export const Header = ({ setIsMenuOpen }) => {
  const navigate = useNavigate();
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
    gap: 15px;
    align-items: center;
  `;

  const onMenuClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const onReplyIconClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="header">
        <Link className="header__logo">Blog</Link>
        <Navigate>
          <Button>Main</Button>
          <Button>Contacts</Button>
        </Navigate>
        <Settings>
          <div className="logo icon">
            <i class="fa fa-reply backIcon" aria-hidden="true" onClick={onReplyIconClick}></i>
          </div>
          <i onClick={onMenuClick} class="fa fa-bars more" aria-hidden="true"></i>
        </Settings>
      </div>
    </>
  );
};
