import {BadRequestException, ConflictException, ForbiddenException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AddApiTokenDto} from "./dto";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";


@Injectable()
export class ApiTokensService {
    constructor(private prisma: PrismaService) {
    }
    async findApiToken(mattermostUserId: string) {
        const res = await this.prisma.apiToken.findFirst({
            where: {
                mattermostUserId: mattermostUserId
            }
        })
        return res
    }

    // Read token
    async getApiToken(mattermostUserId: string) {
        const  res = this.findApiToken(mattermostUserId);
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
        const res = await this.findApiToken(dto.mattermostUserId);
        console.log({
          msg: "registrating token",
          res
        })
        if (res != null) {
            throw new ConflictException("PipeDrive API key for this user is already set.");
        }

        try {
            const res = await this.prisma.apiToken.create({
                data: {
                    mattermostUserId: dto.mattermostUserId,
                    pipedriveApiKey: dto.pipedriveApiKey,
                },
            })
            return res;
        } catch (err) {
            console.log(err);
            throw new BadRequestException("please provide mattermostUserId and pipedriveApiKey fields");
        }

    }

    // Delete token record

    async deleteApiToken(mattermostUserId: string) {
        // TODO: change deleteMany to delete, because delete returns weird error.
        const deletedUser = await this.prisma.apiToken.deleteMany({
            where: {
                mattermostUserId : mattermostUserId,
            }
        })
        return deletedUser;
    }
}
