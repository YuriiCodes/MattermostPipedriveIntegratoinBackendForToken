import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {AuthDto} from "./dto";
import * as argon from "argon2";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {

    }
    async signUp(dto: AuthDto) {
        // Generate the password
        const hash = await argon.hash(dto.password);
        // Save the new user in the db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
        })
        delete user.hash;
        //return the saved user
        return user;
    }

    signIn() {
        return "Sign in";
    }
}