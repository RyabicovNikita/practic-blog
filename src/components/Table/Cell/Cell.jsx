import styled from "styled-components";

const CellLayout = ({ className, cellContent }) => <div className={className}>{cellContent}</div>;

export const Cell = styled(CellLayout)`
  ${({ styles }) => ({ ...styles })}
`;
