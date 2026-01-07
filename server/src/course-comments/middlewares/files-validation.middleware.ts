import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

const MAX_FILES = 2;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

@Injectable()
export class FilesValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const files = req.files as Express.Multer.File[] | undefined;

    if (!files || files.length === 0) {
      return next();
    }

    if (!Array.isArray(files)) {
      throw new BadRequestException("Invalid files format");
    }

    if (files.length > MAX_FILES) {
      throw new BadRequestException(`Maximum ${MAX_FILES} images are allowed`);
    }

    for (const file of files) {
      if (!file.mimetype.startsWith("image/")) {
        throw new BadRequestException("Only image files are allowed");
      }

      if (file.size > MAX_FILE_SIZE) {
        throw new BadRequestException("Each image must be less than 5MB");
      }

      const invalidFiles = files.filter(
        (file) => !ALLOWED_FILE_TYPES.includes(file.mimetype),
      );

      if (invalidFiles.length > 0) {
        throw new BadRequestException(
          "Only JPEG, PNG, GIF and WebP images are allowed",
        );
      }
    }

    next();
  }
}
