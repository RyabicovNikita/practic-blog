import styled from "styled-components";

const CustomIconContainer = ({ className, onClick, src }) => (
  <div className={className}>
    <img alt="" src={src} onClick={onClick} />
  </div>
);

const CustomIcon = styled(CustomIconContainer)`
  cursor: pointer;
  ${({ styles }) => styles};
`;

export default CustomIcon;
