import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AddUserInfoDto} from "./dto";
import {UserInfoService} from "./user-info.service";
import {AuthGuard} from "../auth";


@Controller('apiTokens')
@UseGuards(AuthGuard)
export class UserInfoController {
    constructor(private userInfoService: UserInfoService) {
    }

    @Get("/:mattermostUserId")
    async getUserInfo(@Param("mattermostUserId") mattermostUserId: string) {
        return this.userInfoService.getUserInfo(mattermostUserId);
    }

    @Post("")
    async addNewUserInfo(@Body() dto: AddUserInfoDto) {
        return this.userInfoService.addNewUserInfo(dto);
    }

    @Delete("/:mattermostUserId")
    async deleteUserInfo(@Param("mattermostUserId") mattermostUserId: string) {
        return await this.userInfoService.deleteUserInfo(mattermostUserId);
    }

    @Patch("")
    async updateUserInfo(@Body() dto: AddUserInfoDto) {
        return this.userInfoService.updateUserInfo(dto);
    }
}
