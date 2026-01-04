import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class FileValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.file) {
      if (!req.file.mimetype.startsWith("image/")) {
        throw new BadRequestException("Only images are allowed");
      }

      if (req.file.size > 5 * 1024 * 1024) {
        throw new BadRequestException("File size must be less than 5MB");
      }
    }

    next();
  }
}
