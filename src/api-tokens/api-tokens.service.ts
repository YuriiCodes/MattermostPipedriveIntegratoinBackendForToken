import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AddApiTokenDto} from "./dto";


@Injectable()
export class ApiTokensService {
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

    // Read token
    async getApiToken(mattermostUserId: string) {
        const res = await this.getExistingApiTokenObj(mattermostUserId);
        if (res == null) {
            return {
                msg: `no api key for user with mattermost id ${mattermostUserId}`,
                mattermostUserId
            }
        }
        return res;
    }

    // Create new token
    async registerApiToken(dto: AddApiTokenDto) {
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
                },
            })
        } catch (err) {
            console.log(err);
            return new BadRequestException(err);
        }
    }

    // Delete token record
    async deleteApiToken(mattermostUserId: string) {
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

    async updateApiToken(dto: AddApiTokenDto) {
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
