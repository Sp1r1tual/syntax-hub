import { Request } from "express";

import { UserRole } from "@prisma/client";

export interface IUser {
  userId: string;
  email: string;
  role?: UserRole;
  iat?: number;
  exp?: number;
}

export interface IRequestWithUser extends Request {
  user?: IUser;
}
