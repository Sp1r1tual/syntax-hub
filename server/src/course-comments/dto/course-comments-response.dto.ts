import { createZodDto } from "nestjs-zod";

import { CommentsResponseSchema } from "../schemas/course-comments-response.schema";

export class CommentsResponseDto extends createZodDto(CommentsResponseSchema) {}
