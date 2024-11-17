import styled from "styled-components";
import { RowContainer } from "./Row";
import { Cell } from "./Cell";

const TableLayout = ({ className, data, styles }) => (
  <div className={className}>
    {data &&
      data.map(({ columns, onCellClick }) => (
        <RowContainer rowData={data} styles={styles}>
          {columns.map((cellContent) => (
            <Cell onCellClick={onCellClick} cellContent={cellContent} styles={styles.cell} />
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
