export interface ITextBlock {
  id: string;
  type: "TEXT";
  content: string;
}

export type CodeLanguageType =
  | "javascript"
  | "typescript"
  | "ts"
  | "html"
  | "css"
  | "json"
  | "bash"
  | "shell"
  | "markdown"
  | "yaml"
  | "sql"
  | "python"
  | "java"
  | "csharp";

export interface ICodeBlock {
  id: string;
  type: "CODE";
  language: CodeLanguageType;
  content: string;
}

export interface IImageBlock {
  id: string;
  type: "IMAGE";
  src: string;
  alt?: string;
  caption?: string;
}

export interface IListBlock {
  id: string;
  type: "LIST";
  items: string[];
  title?: string;
  ordered?: boolean;
}

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

export interface ITableBlock {
  id: string;
  type: "TABLE";
  title?: string;
  headers: ITableHeader[];
  rows: ITableRow[];
}

export interface INoteBlock {
  id: string;
  type: "NOTE";
  content: string;
}
