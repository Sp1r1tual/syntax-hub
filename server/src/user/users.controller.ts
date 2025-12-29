import {
  Controller,
  Get,
  Req,
  UseGuards,
  UnauthorizedException,
} from "@nestjs/common";

import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import type { IJwtRequest } from "src/auth/types/auth";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: IJwtRequest) {
    const userId = req.user?.userId;

    if (!userId) throw new UnauthorizedException();

    const user = await this.usersService.findById(userId);

    if (!user) throw new UnauthorizedException();

    return { user };
  }
}
