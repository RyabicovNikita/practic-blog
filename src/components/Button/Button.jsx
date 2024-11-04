import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Button = ({ children, active }) => {
  const CustomLink = styled(NavLink)`
    font-family: "Elite";
    color: ${active ? "white" : "gray"};
    text-decoration: none;
  `;
  return <CustomLink>{children}</CustomLink>;
};
