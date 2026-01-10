import { createZodDto } from "nestjs-zod";

import { CourseDetailsResponseSchema } from "../schemas/index";

export class CourseDetailsResponseDto extends createZodDto(
  CourseDetailsResponseSchema,
) {}
