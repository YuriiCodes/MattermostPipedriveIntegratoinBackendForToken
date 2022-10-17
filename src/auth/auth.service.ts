import {Injectable} from "@nestjs/common";

@Injectable({})
export class AuthService {
    signUp() {
        return  "Sign up";
    }

    signIn() {
        return "Sign in";
    }
}