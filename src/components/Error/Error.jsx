import styled from "styled-components";

const ErrorContainer = ({ className, children, styles }) => <div className={className}>{children}</div>;

export const Error = styled(ErrorContainer)`
  width: 100%;
  height: 100%;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ styles }) => styles};
`;
