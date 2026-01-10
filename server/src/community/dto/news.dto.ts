import { createZodDto } from "nestjs-zod";

import { NewsResponseSchema } from "../schemas/news.schema";

export class NewsResponseDto extends createZodDto(NewsResponseSchema) {}
