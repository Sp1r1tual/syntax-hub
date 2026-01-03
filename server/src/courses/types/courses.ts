export interface ITableCell {
  id: string;
  text: string;
  order: number;
}

export interface ITableRow {
  id: string;
  cells: ITableCell[];
  order: number;
}

export interface ITableHeader {
  id: string;
  text: string;
  order: number;
}

export interface IContentBlockData {
  id: string;
  type: string;
  content?: string;
  language?: string;
  src?: string;
  alt?: string | null;
  caption?: string | null;
  title?: string | null;
  headers?: ITableHeader[];
  rows?: ITableRow[];
}
