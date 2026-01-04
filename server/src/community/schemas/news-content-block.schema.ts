import { z } from "zod";

import {
  TextBlockSchema,
  ImageBlockSchema,
  ListBlockSchema,
} from "src/common/schemas";

export const NewsContentBlockSchema = z.discriminatedUnion("type", [
  TextBlockSchema,
  ImageBlockSchema,
  ListBlockSchema,
]);
