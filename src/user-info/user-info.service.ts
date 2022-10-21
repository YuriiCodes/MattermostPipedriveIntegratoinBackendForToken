import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AddUserInfoDto} from "./dto";
import {isUserDataSubmittedResponse, userInfoResponse} from "./entities/types";


@Injectable()
export class UserInfoService {
    constructor(private prisma: PrismaService) {
    }

    // A method that gets apiToken object. We can then use this object to get MongoDB's entry ID.
    async getExistingApiTokenObj(mattermostUserId: string) {

        // We have to use findFirst, because we are searching by mattermost user ID, and not by unique Mongo id.
        // Therefore, we have to make sure that only one entry is done for every mattermost user ID.
        // Sadly, we can't specify it in Prisma, therefore we have to manually check it in 'registerApiToken' method.
        return await this.prisma.apiToken.findFirst({
            where: {
                mattermostUserId: mattermostUserId
            }
        })
    }

    // Read user info
    async getUserInfo(mattermostUserId: string) : Promise<userInfoResponse | NotFoundException>{
        const res = await this.getExistingApiTokenObj(mattermostUserId);
        if (res == null) {
            throw new ConflictException({
                msg: `no api key for user with mattermost id ${mattermostUserId}`,
                mattermostUserId
            })
        }
        return res;
    }

    async isUserDataSubmitted(mattermostUserId: string) : Promise<isUserDataSubmittedResponse>{
        const res = await this.getExistingApiTokenObj(mattermostUserId);
        if (res == null) {
            return {
                status: false
            }
        }
        return {
            status: true
        };
    }
    // Create new token
    async addNewUserInfo(dto: AddUserInfoDto) :Promise<userInfoResponse | BadRequestException | ConflictException> {
        console.log({
            dto
        });
        // Check if this token is not already in the database
        const res = await this.getExistingApiTokenObj(dto.mattermostUserId);

        if (res != null) {
            throw new ConflictException("PipeDrive API key for this user is already set.");
        }

        try {
            return await this.prisma.apiToken.create({
                data: {
                    mattermostUserId: dto.mattermostUserId,
                    pipedriveApiKey: dto.pipedriveApiKey,

                    linkedInLogin: dto.login,
                    linkedInPassword: dto.password,
                },
            })
        } catch (err) {
            console.log(err);
            return new BadRequestException(err);
        }
    }

    // Delete token record
    async deleteUserInfo(mattermostUserId: string): Promise<userInfoResponse | ConflictException | BadRequestException>{
        const userInfoBeforeDelete = await this.getExistingApiTokenObj(mattermostUserId);

        if (userInfoBeforeDelete === null) {
            throw new ConflictException({
                msg: "You are trying to delete a non-existing user.",
                mattermostUserId,
            });
        }
        try {
            return await this.prisma.apiToken.delete({
                where: {
                    id: userInfoBeforeDelete.id,
                }
            })
        } catch (err) {
            return new BadRequestException(err);
        }

    }

    async updateUserInfo(dto: AddUserInfoDto): Promise<userInfoResponse | ConflictException | BadRequestException> {
        const userInfoBeforeUpdate = await this.getExistingApiTokenObj(dto.mattermostUserId);
        if (userInfoBeforeUpdate === null) {
            throw new ConflictException({
                msg: "You are trying to update a non-existing user.",
                mattermostUserId: dto.mattermostUserId,
            });
        }
        try {
            return await this.prisma.apiToken.update({
                where: {
                    id: userInfoBeforeUpdate.id,
                }, data: {
                    pipedriveApiKey: dto.pipedriveApiKey,
                }
            });
        } catch (err) {
            return new BadRequestException(err);
        }
    }
}
