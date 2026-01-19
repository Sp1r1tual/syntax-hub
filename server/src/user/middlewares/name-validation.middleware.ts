import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

import { NameSchema } from "../schemas/name.schema";

@Injectable()
export class NameValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body = req.body || {};

    if (body.name === undefined || body.name === null) {
      return next();
    }

    try {
      const validatedData = NameSchema.parse({ name: body.name });
      req.body.name = validatedData.name;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        throw new BadRequestException(firstError.message);
      }
      throw error;
    }
  }
}
