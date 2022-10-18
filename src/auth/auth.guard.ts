import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Request} from 'express';
import {ConfigService} from "@nestjs/config";
import * as argon from 'argon2';


/*  To prevent third-party requests from interacting with our API, we implement a AuthGuard Guard.
 *  It works in the following way:
 *  1. We store 'ACCESS_KEY' variable in .env file. That variable is a hash of secret access key, hashed with Argon.
 *  2. In order for user to access API, he must provide a custom 'access-key' HTTP header. In the value field, user must
 *     provide a non-hashed secret access key. Front end client will get this key from its own .env file.
 *  3. We hash the access key from request header and compare it to the one in .env file.
 *     If they match - the 'AuthGuard'  returns true, meaning that user will have access to any controller, protected with AuthGuard.
 *     If they don't match - the 'AuthGuard'  returns false, meaning the user will get 403:Forbidden error.
 *
 *
 *     This authentication mechanism was chosen over standard JWT sessions, because all the requests are intended to be made
 *     from front end api of our custom component, therefore there's no need to implement such a complex mechanism as JWT sessions.
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private config: ConfigService) {
    }

    async validateRequest(request: Request) {
        // We send access key in a custom http server. The one in request must match the hashed one in .env.
        if (!request.headers["access-key"]) {
            return false;
        }

        const accessKeyFromReq: string | string[] = request.headers["access-key"];

        // There must be only one value provided in the 'access-key' token.
        if (Array.isArray(accessKeyFromReq)) {
            return false;
        }

        const accessKeyFromConfig: string = this.config.get("ACCESS_KEY");
        // We hash the code from request 'access-key' header and compare it to the hash in .env file. If they are matching, user has access to the API, if no - he doesn't.
        return await argon.verify(accessKeyFromConfig, accessKeyFromReq);

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
}
