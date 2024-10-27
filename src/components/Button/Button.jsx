import styled from "styled-components";

export const Button = ({ children, active }) => {
  const Link = styled.a`
    font-family: "Elite";
    color: ${active ? "white" : "gray"};
  `;
  return <Link>{children}</Link>;
};
