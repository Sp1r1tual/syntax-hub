import { createZodDto } from "nestjs-zod";

import { GoogleAuthUserSchema } from "../schemas/auth.schemas";

export class GoogleAuthUserDto extends createZodDto(GoogleAuthUserSchema) {}
