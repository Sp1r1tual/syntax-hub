import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";

import type { IGoogleAuthUser, IJwtRequest } from "./types/auth";

import { AuthService } from "./auth.service";

interface AuthRequest extends Request {
  user: IGoogleAuthUser;
}

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private getCookieOptions(isProduction: boolean) {
    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
      path: "/auth/refresh",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    };
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  googleAuth() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req: AuthRequest, @Res() res: Response) {
    const { accessToken, refreshToken } = req.user;

    const frontendUrl =
      this.configService.get<string>("CLIENT_URL") || "http://localhost:5173";

    const isProduction =
      this.configService.get<string>("NODE_ENV") === "production";

    res.cookie(
      "refreshToken",
      refreshToken,
      this.getCookieOptions(isProduction),
    );

    res.redirect(
      `${frontendUrl}/auth/callback?token=${encodeURIComponent(accessToken)}`,
    );
  }

  @Post("refresh")
  async refresh(
    @Req() req: IJwtRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies["refreshToken"];

    if (!refreshToken) {
      throw new UnauthorizedException("No refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshToken(refreshToken);

    const isProduction =
      this.configService.get<string>("NODE_ENV") === "production";

    res.cookie(
      "refreshToken",
      newRefreshToken,
      this.getCookieOptions(isProduction),
    );

    return { accessToken };
  }

  @Post("logout")
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies["refreshToken"];

    if (token) {
      await this.authService.revokeRefreshToken(token);
    }

    const isProduction =
      this.configService.get<string>("NODE_ENV") === "production";

    res.clearCookie("refreshToken", {
      path: "/auth/refresh",
      httpOnly: true,
      secure: isProduction,
      sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
    });

    return res.json({ success: true, message: "Logged out successfully" });
  }
}
