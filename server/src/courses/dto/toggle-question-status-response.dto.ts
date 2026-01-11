import { createZodDto } from "nestjs-zod";

import { ToggleQuestionStatusResponseSchema } from "../schemas/index";

export class ToggleQuestionStatusResponseDto extends createZodDto(
  ToggleQuestionStatusResponseSchema,
) {}
