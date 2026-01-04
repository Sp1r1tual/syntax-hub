import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response, NextFunction } from "express";

import { IRequestWithUser } from "src/community/community.controller";

@Injectable()
export class JwtOptionalMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: IRequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);

      try {
        const payload = this.jwtService.verify(token);
        req.user = payload;
      } catch {}
    }

    next();
  }
}
