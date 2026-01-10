import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth20";

import { GoogleProfileType, GoogleAuthUserType } from "../types/auth";

import { AuthService } from "../auth.service";

interface ExtendedStrategyOptions extends StrategyOptions {
  accessType?: string;
  prompt?: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    const clientID = configService.get<string>("GOOGLE_CLIENT_ID");
    const clientSecret = configService.get<string>("GOOGLE_SECRET");
    const callbackURL = configService.get<string>("GOOGLE_CALLBACK_URL");

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ["email", "profile"],
      accessType: "offline",
      prompt: "consent",
    } as ExtendedStrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfileType,
    done: VerifyCallback,
  ): Promise<void> {
    try {
      const result = await this.authService.validateOAuthLogin(profile);

      const user: GoogleAuthUserType = {
        id: result.id,
        email: result.email,
        name: result.name,
        avatar: result.avatar,
        role: result.role,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      };

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
