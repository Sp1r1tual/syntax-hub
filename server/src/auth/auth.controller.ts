import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Post,
  Body,
  BadRequestException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";

import { AuthService } from "./auth.service";

import { RefreshTokenResponseDto, LogoutResponseDto } from "./dto";

interface AuthRequest extends Request {
  user: {
    user: {
      id: string;
      email: string;
      name: string | null;
    };
    accessToken: string;
    refreshToken: string;
  };
}

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get("google")
  @UseGuards(AuthGuard("google"))
  googleAuth() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req: AuthRequest, @Res() res: Response) {
    const { accessToken, refreshToken } = req.user;

    const frontendUrl =
      this.configService.get<string>("CLIENT_URL") || "http://localhost:5173";

    return res.redirect(
      `${frontendUrl}/auth/callback?` +
        `token=${encodeURIComponent(accessToken)}&` +
        `refresh=${encodeURIComponent(refreshToken)}`,
    );
  }

  @Post("refresh")
  async refresh(
    @Body("refreshToken") refreshToken: string,
  ): Promise<RefreshTokenResponseDto> {
    if (!refreshToken) {
      throw new BadRequestException("Refresh token is required");
    }
    return this.authService.refreshToken(refreshToken);
  }

  @Post("logout")
  async logout(
    @Body("refreshToken") refreshToken: string,
  ): Promise<LogoutResponseDto> {
    if (!refreshToken) {
      throw new BadRequestException("Refresh token is required");
    }
    await this.authService.revokeRefreshToken(refreshToken);
    return {
      success: true,
      message: "Logged out successfully",
    };
  }
}
