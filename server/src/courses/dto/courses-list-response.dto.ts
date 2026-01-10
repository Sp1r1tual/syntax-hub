import { createZodDto } from "nestjs-zod";

import { CoursesGroupedListResponseSchema } from "../schemas/courses-list.schemas";

export class CoursesGroupedListResponseDto extends createZodDto(
  CoursesGroupedListResponseSchema,
) {}
