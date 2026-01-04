import { z } from "zod";
import { createZodDto } from "nestjs-zod";

import { NewsContentBlockSchema } from "../schemas/news-content-block.schema";

const NewsContentArraySchema = z.array(NewsContentBlockSchema);

export class NewsContentArrayDto extends createZodDto(NewsContentArraySchema) {}
