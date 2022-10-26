import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {Request} from "express";


@Injectable()
export class UserIdQueryParamGuard implements CanActivate {
    constructor(private config: ConfigService) {}

    async validateRequest(request: Request) {
        // We send access key in a custom http server. The one in request must match the hashed one in .env.
        if (!request.query["mmUID"]) {
            // we throw a custom 401 exception, instead of default 403 forbidden resource
            throw new UnauthorizedException();
        }
        return true;
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
}
