import { IsEmail, IsString, IsOptional, IsUrl } from "class-validator";

export class CreateUserOAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;
}
