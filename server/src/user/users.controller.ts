import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUserId } from "src/auth/decorators/get-user-id.decorator";

import { UsersService } from "./users.service";

import { uploadAvatarToCloudinary } from "./utils/upload-avatar";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  async me(@GetUserId() userId: string) {
    const user = await this.usersService.findById(userId);

    return { user };
  }

  @Patch("me/update")
  @UseInterceptors(FileInterceptor("avatar"))
  async updateProfile(
    @GetUserId() userId: string,
    @Body("name") name?: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let avatar: string | undefined;

    if (file) {
      avatar = await uploadAvatarToCloudinary(file.buffer, userId);
    }

    const updatedProfile = await this.usersService.updateProfile(userId, {
      name,
      avatar,
    });

    return { updatedProfile };
  }
}
