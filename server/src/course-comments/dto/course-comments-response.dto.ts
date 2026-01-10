import { createZodDto } from "nestjs-zod";

import { CommentsResponseSchema } from "../schemas/course-comments.schemas";

export class CommentsResponseDto extends createZodDto(CommentsResponseSchema) {}
