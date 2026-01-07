import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth20";

import { IGoogleProfile, IGoogleAuthUser } from "../types/auth";

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
    profile: IGoogleProfile,
    done: VerifyCallback,
  ): Promise<void> {
    try {
      const result = await this.authService.validateOAuthLogin(profile);

      const user: IGoogleAuthUser = {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        avatar: result.user.avatar,
        role: result.user.role,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      };

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
