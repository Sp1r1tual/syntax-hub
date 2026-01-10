import { createZodDto } from "nestjs-zod";

import { UpdateUserProfileSchema } from "../schemas/users.schemas";

export class UpdateUserProfileDto extends createZodDto(
  UpdateUserProfileSchema,
) {}
