import type { Request } from "express";

import { UserRole } from "@prisma/client";

export interface IJwtUser {
  userId: string;
  role: UserRole;
}

export interface IGoogleProfile {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: Array<{
    value: string;
    verified: boolean;
  }>;
  photos?: Array<{
    value: string;
  }>;
  provider: string;
  _raw: string;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
  };
}

export interface IGoogleAuthUser {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
  refreshToken: string;
}

export interface IJwtPayload {
  userId: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface IJwtRequest extends Request {
  user: IJwtPayload;
}
