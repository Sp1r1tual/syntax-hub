import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtUserType, JwtPayloadType } from "../types/auth";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const secret = configService.get<string>("JWT_SECRET");

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayloadType): Promise<JwtUserType> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
      select: { role: true, isBanned: true },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    if (user.isBanned) {
      throw new ForbiddenException("Your account has been banned");
    }

    return {
      userId: payload.userId,
      role: user.role,
    };
  }
}
