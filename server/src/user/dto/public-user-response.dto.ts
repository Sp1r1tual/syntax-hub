import { createZodDto } from "nestjs-zod";

import { PublicUserResponseSchema } from "../schemas/users.schemas";

export class PublicUserResponseDto extends createZodDto(
  PublicUserResponseSchema,
) {}
