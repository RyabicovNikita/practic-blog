import styled from "styled-components";

const IconLayout = ({ className, onClick }) => <i aria-hidden="true" className={className} onClick={onClick} />;

export const Icon = styled(IconLayout)`
  ${({ styles }) => styles}
  cursor:pointer;
`;
