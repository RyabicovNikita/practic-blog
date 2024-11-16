import styled from "styled-components";

export const RowContainer = ({ rowData, styles, children: cellsContent }) => {
  const { row: rowStyles } = styles;
  rowStyles["grid-template-columns"] = `repeat(${rowData?.[0]?.columns?.length ?? 0}, 1fr)`;
  return <Row styles={rowStyles} cellsContent={cellsContent} />;
};
const RowLayout = ({ className, cellsContent }) => <div className={className}>{cellsContent}</div>;

const Row = styled(RowLayout)`
  display: grid;
  ${({ styles }) => ({ ...styles })};
`;
