import { createZodDto } from "nestjs-zod";

import { BanUserSchema } from "../schemas/users.schemas";

export class BanUserDto extends createZodDto(BanUserSchema) {}
