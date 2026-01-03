import { ContentBlockType } from "@prisma/client";
import { IContentBlockData, ITableHeader, ITableRow } from "../types";

interface IBlockWithRelations {
  id: string;
  type: ContentBlockType;
  content: string | null;
  language: string | null;
  src: string | null;
  alt: string | null;
  caption: string | null;
  title: string | null;
  headers?: Array<{
    id: string;
    text: string;
    order: number;
  }>;
  rows?: Array<{
    id: string;
    order: number;
    cells: Array<{
      id: string;
      text: string;
      order: number;
    }>;
  }>;
}

export class ContentBlockMapper {
  static mapBlock(block: IBlockWithRelations): IContentBlockData {
    const base: IContentBlockData = {
      id: block.id,
      type: block.type,
    };

    switch (block.type) {
      case ContentBlockType.TEXT:
      case ContentBlockType.NOTE:
        return {
          ...base,
          content: block.content ?? undefined,
        };

      case ContentBlockType.CODE:
        return {
          ...base,
          content: block.content ?? undefined,
          language: block.language ?? undefined,
        };

      case ContentBlockType.IMAGE:
        return {
          ...base,
          src: block.src ?? undefined,
          alt: block.alt ?? undefined,
          caption: block.caption ?? undefined,
        };

      case ContentBlockType.TABLE:
        const headers: ITableHeader[] =
          block.headers?.map((h) => ({
            id: h.id,
            text: h.text,
            order: h.order,
          })) ?? [];

        const rows: ITableRow[] =
          block.rows?.map((r) => ({
            id: r.id,
            order: r.order,
            cells: r.cells.map((c) => ({
              id: c.id,
              text: c.text,
              order: c.order,
            })),
          })) ?? [];

        return {
          ...base,
          title: block.title ?? undefined,
          headers,
          rows,
        };

      default:
        return base;
    }
  }
}
