import styled from "styled-components";
import { RowContainer } from "./Row";
import { Cell } from "./Cell";

const TableLayout = ({ className, data, styles }) => (
  <div className={className}>
    {data &&
      data.map(({ columns }) => (
        <RowContainer rowData={data} styles={styles}>
          {columns.map((cellContent) => (
            <Cell cellContent={cellContent} styles={styles.cell} />
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
