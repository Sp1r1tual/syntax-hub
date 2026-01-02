import { ContentBlockType } from "@prisma/client";
import { IContentBlockData } from "../types";

export class ContentBlockMapper {
  static mapBlock(block: {
    id: string;
    type: ContentBlockType;
    content: string | null;
    language: string | null;
    src: string | null;
    alt: string | null;
    caption: string | null;
    title: string | null;
    headers: string[];
    rows: unknown;
  }): IContentBlockData {
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
        return {
          ...base,
          title: block.title ?? undefined,
          headers: block.headers,
          rows: block.rows as string[][],
        };

      default:
        return base;
    }
  }
}
