import z from "zod";
import type { Request } from "express";

import {
  GoogleAuthUserSchema,
  GoogleProfileSchema,
  JwtPayloadSchema,
  JwtUserSchema,
} from "../schemas/auth.schemas";

export type GoogleProfileType = z.infer<typeof GoogleProfileSchema>;
export type GoogleAuthUserType = z.infer<typeof GoogleAuthUserSchema>;
export type JwtPayloadType = z.infer<typeof JwtPayloadSchema>;
export type JwtUserType = z.infer<typeof JwtUserSchema>;

export interface IJwtRequest extends Request {
  user: JwtPayloadType;
}
