import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';
import {AddUserInfoDto} from "./dto";
import {UserInfoService} from "./user-info.service";
import {AuthGuard} from "../auth";
import {
    ApiBadRequestResponse, ApiConflictResponse,
    ApiForbiddenResponse,
    ApiHeader,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";
import {forbiddenResponse, userInfoResponse, userNotFoundResponse} from "./entities/types";

@ApiHeader({
    name: 'access-key',
    description: 'Access key to enter API',
    required: true,
})
@ApiTags('Working with sales department workers data')
@Controller('userInfo')
@ApiForbiddenResponse({description: 'Access key is not valid', type: forbiddenResponse})
@UseGuards(AuthGuard)
export class UserInfoController {
    constructor(private userInfoService: UserInfoService) {}


    @ApiOkResponse({description: 'User is successfully retrieved', type: userInfoResponse})
    @ApiConflictResponse({description: 'User not found', type: userNotFoundResponse})
    @Get("/:mattermostUserId")
    async getUserInfo(@Param("mattermostUserId") mattermostUserId: string):Promise<userInfoResponse | ConflictException> {
        return this.userInfoService.getUserInfo(mattermostUserId);
    }



    @Post("")
    @ApiOkResponse({description: 'User created successfully', type: userInfoResponse})
    @ApiBadRequestResponse({description: 'Bad request'})
    @ApiConflictResponse({description: 'User not found', type: userNotFoundResponse})
    async addNewUserInfo(@Body() dto: AddUserInfoDto): Promise<userInfoResponse | BadRequestException | ConflictException>{
        return this.userInfoService.addNewUserInfo(dto);
    }



    @ApiOkResponse({description: 'User deleted successfully', type: userInfoResponse})
    @ApiConflictResponse({description: 'User not found', type: userNotFoundResponse})
    @ApiBadRequestResponse({description: 'Bad request'})
    @Delete("/:mattermostUserId")
    async deleteUserInfo(@Param("mattermostUserId") mattermostUserId: string) : Promise<userInfoResponse | ConflictException | BadRequestException> {
        return await this.userInfoService.deleteUserInfo(mattermostUserId);
    }


    @ApiOkResponse({description: 'User info updated successfully.', type: userInfoResponse})
    @ApiConflictResponse({description: 'You are trying to update a non-existent user.', type: userNotFoundResponse})
    @ApiBadRequestResponse({description: 'Bad request'})
    @Patch("")
    async updateUserInfo(@Body() dto: AddUserInfoDto): Promise<userInfoResponse | ConflictException | BadRequestException> {
        return this.userInfoService.updateUserInfo(dto);
    }
}
