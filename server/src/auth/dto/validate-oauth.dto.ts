import { IsEmail, IsString, IsOptional } from "class-validator";

export class ValidateOAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;
}
