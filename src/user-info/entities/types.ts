import {ApiProperty} from "@nestjs/swagger";

export class userInfoResponse {
    @ApiProperty()
    id: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty()
    mattermostUserId: string;
    @ApiProperty()
    pipedriveApiKey: string;
    @ApiProperty()
    linkedInLogin: string;
    @ApiProperty()
    linkedInPassword: string;
}

export class isUserDataSubmittedResponse {
    @ApiProperty()
    status: boolean;
}

export  class forbiddenResponse {
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    message: string;
    @ApiProperty()
    error: string;
}

export class userNotFoundResponse {
    @ApiProperty()
    msg: string;

    @ApiProperty()
    mattermostUserId: string;
}