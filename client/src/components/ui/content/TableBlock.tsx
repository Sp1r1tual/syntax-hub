import { ITableHeader, ITableRow } from "@/common/types";

import styles from "./styles/TableBlock.module.css";

interface ITableBlockProps {
  id: string;
  title?: string | undefined;
  headers: ITableHeader[];
  rows: ITableRow[];
}

export const TableBlock = ({ id, title, headers, rows }: ITableBlockProps) => {
  return (
    <div key={id}>
      {title && <div className={styles.tableTitle}>{title}</div>}

      <div className={styles.tableWrapper}>
        <table className={styles.tableBlock}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.id}>{header.text}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {row.cells.map((cell) => (
                  <td key={cell.id}>{cell.text}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
