import styled from "styled-components";

const ButtonContainer = ({ className, disabled, onClick, children }) => (
  <button className={className} disabled={disabled} onClick={onClick}>
    {children}
  </button>
);

export const Button = styled(ButtonContainer)`
  ${({ styles }) => styles};
  :first-child {
    color: ${({ disabled }) => (disabled ? "gray" : "inherit")};
  }
`;
