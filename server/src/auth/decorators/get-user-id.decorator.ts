import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

export const GetUserId = createParamDecorator(
  (optional: boolean = false, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.user?.userId;

    if (!userId && !optional) {
      throw new UnauthorizedException("User ID not found");
    }

    return userId;
  },
);
