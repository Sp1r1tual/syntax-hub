import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
  Profile,
} from "passport-google-oauth20";

import { IGoogleProfile } from "../types/auth";

import { AuthService } from "../auth.service";

interface ExtendedStrategyOptions extends StrategyOptions {
  accessType?: string;
  prompt?: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  private readonly logger = new Logger(GoogleStrategy.name);

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

    this.logger.log("Google OAuth Strategy initialized");
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: IGoogleProfile,
    done: VerifyCallback,
  ): Promise<void> {
    try {
      const user = await this.authService.validateOAuthLogin(profile);
      done(null, user);
    } catch (err) {
      this.logger.error("Google OAuth validation failed", err);
      done(err, false);
    }
  }
}
