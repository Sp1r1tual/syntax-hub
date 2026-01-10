import { createZodDto } from "nestjs-zod";

import { CreateUserOAuthSchema } from "../schemas/users.schemas";

export class CreateUserOAuthDto extends createZodDto(CreateUserOAuthSchema) {}
