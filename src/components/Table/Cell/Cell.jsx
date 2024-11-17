import styled from "styled-components";

const CellLayout = ({ className, cellContent, onCellClick }) => (
  <div onClick={onCellClick} className={className}>
    {cellContent}
  </div>
);

export const Cell = styled(CellLayout)`
  ${({ styles }) => ({ ...styles })}
`;
