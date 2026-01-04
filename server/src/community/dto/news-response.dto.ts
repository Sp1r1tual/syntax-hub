import { createZodDto } from "nestjs-zod";

import { NewsResponseSchema } from "../schemas/news-response.schema";

export class NewsResponseDto extends createZodDto(NewsResponseSchema) {}
