import styled from "styled-components";

const ButtonContainer = ({ className, disabled, onClick, children }) => (
  <button className={className} disabled={disabled} onClick={onClick}>
    {children}
  </button>
);

export const Button = styled(ButtonContainer)`
  ${({ styles }) => styles};
  :hover {
    ${({ setSendIconClassName }) => setSendIconClassName("")}
  }
  :first-child {
    color: ${({ disabled }) => (disabled ? "gray" : "inherit")};
  }
`;
