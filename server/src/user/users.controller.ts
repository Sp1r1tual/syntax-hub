import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Post,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import z from "zod";

import {
  UpdateUserProfileSchema,
  BanUserSchema,
} from "./schemas/users.schemas";

import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
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
  async changeProfileInfo(
    @GetUserId() userId: string,
    @Body("name") name?: string,
    @Body("socials") socials?: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let avatar: string | undefined;

    if (file) {
      avatar = await uploadAvatarToCloudinary(file.buffer, userId);
    }

    let socialsObj: z.infer<typeof UpdateUserProfileSchema>["socials"];
    if (socials) {
      try {
        const parsed = JSON.parse(socials);
        socialsObj = UpdateUserProfileSchema.shape.socials.parse(parsed);
      } catch {
        throw new BadRequestException("Invalid socials format");
      }
    }

    const updatedProfile = await this.usersService.updateProfile(userId, {
      name,
      avatar,
      socials: socialsObj,
    });

    return { updatedProfile };
  }

  @Get(":userId")
  async getPublicUser(@Param("userId") userId: string) {
    const user = await this.usersService.getPublicUser(userId);
    return { user };
  }

  @Post(":userId/ban")
  @UseGuards(RolesGuard)
  @Roles("ADMIN", "MODERATOR")
  async banUser(
    @Param("userId") userId: string,
    @Body() body: z.infer<typeof BanUserSchema>,
  ) {
    const user = await this.usersService.banUser(userId, body || {});
    return { user };
  }

  @Delete(":userId/ban")
  @UseGuards(RolesGuard)
  @Roles("ADMIN", "MODERATOR")
  async unbanUser(@Param("userId") userId: string) {
    const user = await this.usersService.unbanUser(userId);
    return { user };
  }
}
