import { createZodDto } from "nestjs-zod";

import { RefreshTokenSchema } from "../schemas/auth.schemas";

export class RefreshTokenDto extends createZodDto(RefreshTokenSchema) {}
