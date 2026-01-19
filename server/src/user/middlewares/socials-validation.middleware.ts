import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

import { SocialsSchema } from "../schemas/users.schemas";

@Injectable()
export class SocialsValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body = req.body || {};

    if (!body.socials) {
      return next();
    }

    try {
      const validatedData = SocialsSchema.parse(body.socials);

      if (validatedData) {
        req.body.socials = {
          ...(validatedData.telegramUrl && validatedData.telegramUrl !== ""
            ? { telegramUrl: validatedData.telegramUrl }
            : {}),
          ...(validatedData.githubUrl && validatedData.githubUrl !== ""
            ? { githubUrl: validatedData.githubUrl }
            : {}),
          ...(validatedData.instagramUrl && validatedData.instagramUrl !== ""
            ? { instagramUrl: validatedData.instagramUrl }
            : {}),
        };
      }

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
