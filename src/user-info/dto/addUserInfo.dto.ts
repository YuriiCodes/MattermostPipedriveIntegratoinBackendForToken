import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class AddUserInfoDto {
    @IsNotEmpty()
    @IsString()
    mattermostUserId: string;

    @IsNotEmpty()
    @IsString()
    pipedriveApiKey: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

