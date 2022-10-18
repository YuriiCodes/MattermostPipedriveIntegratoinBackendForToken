import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AddApiTokenDto} from "./dto";
import {ApiTokensService} from "./api-tokens.service";
import {AuthGuard} from "../auth";


@Controller('apiTokens')
@UseGuards(AuthGuard)
export class ApiTokensController {
    constructor(private apiTokensService: ApiTokensService) {
    }

    @Get("/:mattermostUserId")
    async getApiToken(@Param("mattermostUserId") mattermostUserId: string) {
        return this.apiTokensService.getApiToken(mattermostUserId);
    }

    @Post("")
    async registerApiToken(@Body() dto: AddApiTokenDto) {
        return this.apiTokensService.registerApiToken(dto);
    }

    @Delete("/:mattermostUserId")
    async deleteApiToken(@Param("mattermostUserId") mattermostUserId: string) {
        return await this.apiTokensService.deleteApiToken(mattermostUserId);
    }

    @Patch("")
    async updateApiToken(@Body() dto: AddApiTokenDto) {
        return this.apiTokensService.updateApiToken(dto);
    }

}
