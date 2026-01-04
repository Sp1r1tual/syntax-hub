import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class NameValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    if (name === undefined || name === null) {
      return next();
    }

    if (typeof name === "string" && name.trim().length === 0) {
      throw new BadRequestException("Name cannot be empty");
    }

    if (typeof name !== "string") {
      throw new BadRequestException("Name must be a string");
    }

    if (name.length > 32) {
      throw new BadRequestException("Name must not exceed 32 characters");
    }

    if (name.trim().length < 2) {
      throw new BadRequestException("Name must be at least 2 characters long");
    }

    next();
  }
}
