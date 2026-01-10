import { createZodDto } from "nestjs-zod";

import { UserResponseSchema } from "../schemas/users.schemas";

export class UserResponseDto extends createZodDto(UserResponseSchema) {}
