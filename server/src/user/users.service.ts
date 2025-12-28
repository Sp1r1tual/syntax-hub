import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

import { CreateUserOAuthDto, UserResponseDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async upsertFromOAuth(dto: CreateUserOAuthDto): Promise<UserResponseDto> {
    return this.prisma.user.upsert({
      where: { email: dto.email },
      update: { name: dto.name },
      create: {
        email: dto.email,
        name: dto.name,
        roles: {
          create: {
            role: { connect: { key: "user" } },
          },
        },
      },
      include: { roles: { include: { role: true } } },
    });
  }

  async findById(id: string): Promise<UserResponseDto | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { roles: { include: { role: true } } },
    });
  }
}
