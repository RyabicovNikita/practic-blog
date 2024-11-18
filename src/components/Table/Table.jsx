import styled from "styled-components";
import { RowContainer } from "./Row";
import { Cell } from "./Cell";

const TableLayout = ({ className, data, styles }) => (
  <div className={className}>
    {data &&
      data.map(({ columns, onCellClick }, index) => (
        <RowContainer key={index} rowData={data} styles={styles}>
          {columns.map((cellContent, index) => (
            <Cell key={index} onCellClick={onCellClick} cellContent={cellContent} styles={styles.cell} />
          ))}
        </RowContainer>
      ))}
  </div>
);

export const Table = styled(TableLayout)`
  ${({ styles }) => styles.table}
  :last-child {
    border: 0;
  }
`;
