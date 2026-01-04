import { z } from "zod";

export const TableCellSchema = z.object({
  id: z.string(),
  text: z.string(),
  order: z.number(),
});

export const TableRowSchema = z.object({
  id: z.string(),
  order: z.number(),
  cells: z.array(TableCellSchema),
});

export const TableHeaderSchema = z.object({
  id: z.string(),
  text: z.string(),
  order: z.number(),
});

export const TableBlockSchema = z.object({
  id: z.string(),
  type: z.literal("TABLE"),
  title: z.string().optional(),
  headers: z.array(TableHeaderSchema),
  rows: z.array(TableRowSchema),
});
