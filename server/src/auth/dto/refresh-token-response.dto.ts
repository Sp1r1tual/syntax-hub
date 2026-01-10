import { createZodDto } from "nestjs-zod";

import { RefreshTokenResponseSchema } from "../schemas/auth.schemas";

export class RefreshTokenResponseDto extends createZodDto(
  RefreshTokenResponseSchema,
) {}
