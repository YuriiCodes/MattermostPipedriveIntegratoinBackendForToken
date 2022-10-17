import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AddApiTokenDto} from "./dto";
import {ApiTokensService} from "./api-tokens.service";

@Controller('api-tokens')
export class ApiTokensController {
    constructor(private apiTokensService: ApiTokensService) {}

    @Get("get/:mattermostUserId")
    async getPipeDriveApiToken(@Param("mattermostUserId") mattermostUserId: string) {
        return this.apiTokensService.getApiToken(mattermostUserId);
    }

    @Post("register")
    async registerApiTokens(@Body() dto: AddApiTokenDto) {
        return this.apiTokensService.registerApiToken(dto);
    }
}
