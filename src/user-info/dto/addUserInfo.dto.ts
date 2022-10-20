import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddUserInfoDto {
    @ApiProperty({
        description: "A unique identifier of a user from mattermost app.",
        example: "ktk3xfzy7ink8gtgkwfuko98ca",
    })
    @IsNotEmpty()
    @IsString()
    mattermostUserId: string;

    @ApiProperty({
        description: "An API key to access PipeDrive API. Here's where to find it: https://support.pipedrive.com/en/article/how-can-i-find-my-personal-api-key",
        example: "9c1ba905eeccc08eb6df0f4397b90aa7f85a6121",
    })
    @IsNotEmpty()
    @IsString()
    pipedriveApiKey: string;

    @ApiProperty({
        description: "An email used for LinkedIn authorization.",
        example: "TestMailforLinkedIn@gmail.com",
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    login: string;

    @ApiProperty({
        description: "An password used for LinkedIn authorization.",
        example: "EasyPassw0rd",
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}

