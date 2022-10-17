import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto";


// const prisma = new PrismaClient();
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }


    @Post("signup")
    async signUp(@Body() dto: AuthDto) {

        // const post = await prisma.apiToken.create({
        //     data: {
        //         pipedriveApiKey: "2 TEST PIPEDRIVE KEY 2",
        //         mattermostUserId: "2 TEST MATTERMOST KEY 2",
        //     }
        // })
        return this.authService.signUp(dto);
    }


    @Post('signin')
    signIn() {
        return this.authService.signIn();
    }


}

